import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Actor, Context, Env } from "./types";
import {
  assertOrigin,
  cookie,
  HttpError,
  json,
  readJson,
  setCookie,
  withCookies,
} from "./http";
import {
  equal,
  makeCookie,
  random,
  rateLimit,
  sha256,
  sign,
  signedCookie,
  verifyPassword,
} from "./security";
const keySets = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
export function accessIssuer(env: Env) {
  const domain = (env.ACCESS_TEAM_DOMAIN || "")
    .replace(/^https:\/\//, "")
    .replace(/\/$/, "");
  if (!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(domain) || !env.ACCESS_AUD)
    throw new HttpError(503, "auth_config", "管理员登录尚未配置。");
  return "https://" + domain;
}
export async function actor(request: Request, env: Env): Promise<Actor> {
  if (
    env.ADMIN_AUTH_MODE &&
    !["access", "password"].includes(env.ADMIN_AUTH_MODE)
  )
    throw new HttpError(503, "auth_config", "管理员登录尚未配置。");
  if (env.ADMIN_AUTH_MODE === "access") {
    const token = request.headers.get("cf-access-jwt-assertion");
    if (!token) throw new HttpError(401, "login_required", "请先登录后台。");
    const issuer = accessIssuer(env);
    let keys = keySets.get(issuer);
    if (!keys) {
      keys = createRemoteJWKSet(new URL(issuer + "/cdn-cgi/access/certs"));
      keySets.set(issuer, keys);
    }
    try {
      const { payload } = await jwtVerify(token, keys, {
        issuer,
        audience: env.ACCESS_AUD,
        algorithms: ["RS256"],
        requiredClaims: ["exp", "sub", "email"],
      });
      const email = typeof payload.email === "string" ? payload.email : "";
      if (
        !email ||
        !payload.sub ||
        (env.ADMIN_EMAILS &&
          !env.ADMIN_EMAILS.split(",")
            .map((v) => v.trim().toLowerCase())
            .includes(email.toLowerCase()))
      )
        throw Error();
      return { username: email, csrf: await sign("csrf:" + token, env) };
    } catch {
      throw new HttpError(401, "login_required", "登录已失效，请重新登录。");
    }
  }
  const token = cookie(request, "lzz_admin");
  if (!token) throw new HttpError(401, "login_required", "请先登录后台。");
  const tokenHash = await sha256(token);
  const session = await env.DB.prepare(
    "SELECT username,csrf FROM admin_sessions WHERE token_hash=? AND expires_at>?",
  )
    .bind(tokenHash, Date.now())
    .first<{ username: string; csrf: string }>();
  if (!session)
    throw new HttpError(401, "login_required", "登录已失效，请重新登录。");
  return { ...session, tokenHash };
}
export async function requireAdmin(request: Request, env: Env) {
  const user = await actor(request, env);
  if (!["GET", "HEAD"].includes(request.method)) {
    assertOrigin(request);
    if (!equal(request.headers.get("x-lzz-csrf") || "", user.csrf))
      throw new HttpError(403, "csrf", "页面凭据已失效，请刷新后重试。");
  }
  return user;
}
export async function audit(
  env: Env,
  user: Actor,
  action: string,
  target = "",
) {
  await env.DB.prepare(
    "INSERT INTO admin_audit(id,actor,action,target,created_at) VALUES(?,?,?,?,?)",
  )
    .bind(random(), user.username, action, target, Date.now())
    .run();
}
export async function markInternalVisitor(request: Request, env: Env) {
  const visitor = await signedCookie(request, env, "lzz_visitor");
  if (visitor)
    await env.DB.batch(
      ["visitors", "visits", "events", "inquiries"].map((table) =>
        env.DB.prepare(
          `UPDATE ${table} SET internal=1 WHERE ${table === "visitors" ? "id" : "visitor_id"}=?`,
        ).bind(visitor),
      ),
    );
}
export async function login({ request, env }: Context) {
  assertOrigin(request);
  if (env.ADMIN_AUTH_MODE === "access")
    throw new HttpError(404, "access_only", "请使用 Cloudflare Access 登录。");
  const body = await readJson(request, 4000);
  await rateLimit(request, env, "login", 8, 900);
  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD_HASH)
    throw new HttpError(503, "auth_config", "管理员登录尚未配置。");
  const username = typeof body.username === "string" ? body.username : "",
    password = typeof body.password === "string" ? body.password : "";
  const valid = await verifyPassword(password, env.ADMIN_PASSWORD_HASH);
  if (!equal(username, env.ADMIN_USERNAME) || password.length > 512 || !valid)
    throw new HttpError(401, "invalid_login", "用户名或密码不正确。");
  const token = random() + random(),
    csrf = random() + random();
  await env.DB.prepare("DELETE FROM admin_sessions WHERE expires_at<=?")
    .bind(Date.now())
    .run();
  await env.DB.prepare(
    "INSERT INTO admin_sessions(token_hash,username,csrf,expires_at) VALUES(?,?,?,?)",
  )
    .bind(await sha256(token), username, csrf, Date.now() + 8 * 3600000)
    .run();
  await markInternalVisitor(request, env);
  const adminCookie = setCookie(request, "lzz_admin", token, 8 * 3600).replace(
    "SameSite=Lax",
    "SameSite=Strict",
  );
  return withCookies(json({ authenticated: true, username, csrf }), [
    adminCookie,
    await makeCookie(request, env, "lzz_internal", "yes", 30 * 86400),
  ]);
}
export async function logout(request: Request, env: Env, user: Actor) {
  if (user.tokenHash)
    await env.DB.prepare("DELETE FROM admin_sessions WHERE token_hash=?")
      .bind(user.tokenHash)
      .run();
  return withCookies(json({ ok: true }), [
    setCookie(request, "lzz_admin", "", 0),
  ]);
}

import { cookie, HttpError, isLocal, setCookie } from "./http";
import type { Env } from "./types";
const encoder = new TextEncoder();
export const random = () => crypto.randomUUID();
export const base64 = (bytes: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)));
export const unbase64 = (value: string) =>
  Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
export async function sha256(value: string | ArrayBuffer | Uint8Array) {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof value === "string"
          ? encoder.encode(value)
          : (value as BufferSource),
      ),
    ),
  ]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
}
export function equal(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
export async function sign(value: string, env: Env) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(env.TOKEN_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64(await crypto.subtle.sign("HMAC", key, encoder.encode(value)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}
export async function signedCookie(request: Request, env: Env, name: string) {
  const raw = cookie(request, name),
    parts = raw.split(".");
  if (parts.length !== 3) return "";
  const [value, expiry, signature] = parts;
  if (
    Number(expiry) < Date.now() ||
    !equal(signature, await sign(name + ":" + value + "." + expiry, env))
  )
    return "";
  return value;
}
export async function makeCookie(
  request: Request,
  env: Env,
  name: string,
  value: string,
  seconds: number,
) {
  const payload = value + "." + (Date.now() + seconds * 1000);
  return setCookie(
    request,
    name,
    payload + "." + (await sign(name + ":" + payload, env)),
    seconds,
  );
}
export function ip(request: Request) {
  return request.headers.get("cf-connecting-ip") || "unknown";
}
export async function internal(request: Request, env: Env) {
  return (
    (env.INTERNAL_IPS || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .includes(ip(request)) ||
    (await signedCookie(request, env, "lzz_internal")) === "yes"
  );
}
export function knownBot(request: Request) {
  const cf = (
    request as Request & {
      cf?: { botManagement?: { verifiedBot?: boolean; score?: number } };
    }
  ).cf;
  return (
    !!cf?.botManagement?.verifiedBot ||
    (cf?.botManagement?.score ?? 100) < 10 ||
    /bot\b|crawler|spider|slurp|headlesschrome|lighthouse|pagespeed/i.test(
      request.headers.get("user-agent") || "",
    )
  );
}
export async function rateLimit(
  request: Request,
  env: Env,
  scope: string,
  limit: number,
  seconds: number,
  identity = "",
) {
  const now = Date.now(),
    slot = Math.floor(now / (seconds * 1000));
  const key =
    scope +
    ":" +
    slot +
    ":" +
    (await sha256(env.TOKEN_SECRET + ":" + (identity || ip(request))));
  const row = await env.DB.prepare(
    "INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
  )
    .bind(key, (slot + 1) * seconds * 1000)
    .first<{ count: number }>();
  if (row?.count === 1)
    await env.DB.prepare(
      "DELETE FROM rate_limits WHERE key IN (SELECT key FROM rate_limits WHERE expires_at<? LIMIT 500)",
    )
      .bind(now)
      .run()
      .catch(() => {});
  if (!row || row.count > limit)
    throw new HttpError(
      429,
      "rate_limit",
      "请求过于频繁，请稍后重试。",
      Math.max(1, Math.ceil(((slot + 1) * seconds * 1000 - now) / 1000)),
    );
}
export async function verifyPassword(password: string, encoded: string) {
  try {
    const [kind, rounds, salt, hash] = encoded.split("$");
    if (kind !== "pbkdf2-sha256" || Number(rounds) !== 100000) return false;
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const result = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: unbase64(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      256,
    );
    return equal(base64(result), hash);
  } catch {
    return false;
  }
}
export async function verifyTurnstile(
  request: Request,
  env: Env,
  token: string,
) {
  if (isLocal(request, env)) return;
  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.TURNSTILE_SITE_KEY ||
    /^\dx0{8}/.test(env.TURNSTILE_SECRET_KEY)
  )
    throw new HttpError(503, "not_configured", "在线提交尚未配置完成。");
  if (!token || token.length > 2048)
    throw new HttpError(400, "captcha", "请完成人机验证。");
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip(request) === "unknown" ? undefined : ip(request),
      }),
      signal: AbortSignal.timeout(12000),
    },
  );
  if (!response.ok)
    throw new HttpError(
      503,
      "captcha_unavailable",
      "人机验证暂时不可用，请重试。",
    );
  const result = (await response.json()) as {
    success: boolean;
    hostname?: string;
    action?: string;
  };
  if (
    !result.success ||
    result.hostname !== new URL(request.url).hostname ||
    result.action !== "inquiry"
  )
    throw new HttpError(400, "captcha", "人机验证已失效，请重试。");
}

import type { Context } from "./types";
import {
  assertConfigured,
  assertOrigin,
  HttpError,
  isLocal,
  json,
  withCookies,
} from "./http";
import { login, logout, markInternalVisitor, requireAdmin } from "./auth";
import { makeCookie, rateLimit } from "./security";
import { analyticsConsent, analyticsSession, forgetVisitor, recordEvents } from "./analytics";
import { recordAggregate } from "./aggregateAnalytics";
import { receiveInquiry } from "./inquiries";
import {
  addNote,
  downloadFile,
  exportInquiries,
  inquiryDetail,
  internalBrowser,
  journey,
  listInquiries,
  options,
  overview,
  updateInquiry,
  visitors,
} from "./admin";

export async function handleApi(context: Context): Promise<Response> {
  const { request, env } = context,
    url = new URL(request.url),
    path = url.pathname.replace(/\/$/, "");
  try {
    assertConfigured(request, env);
    if (path === "/api/config" && request.method === "GET")
      return json({
        connected:
          isLocal(request, env) ||
          !!(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY),
        captchaSiteKey: isLocal(request, env)
          ? ""
          : env.TURNSTILE_SITE_KEY || "",
        adminAuthMode: env.ADMIN_AUTH_MODE || "password",
        local: isLocal(request, env),
        analyticsMode: env.ANALYTICS_MODE === "aggregate" ? "aggregate" : "detailed",
      });
    if (path === "/api/inquiries" && request.method === "POST")
      return await receiveInquiry(context);
    if (path === "/api/analytics/consent" && request.method === "POST")
      return await analyticsConsent(context);
    if (path === "/api/analytics/session" && request.method === "POST")
      return await analyticsSession(context);
    if (path === "/api/analytics/aggregate" && request.method === "POST")
      return await recordAggregate(context);
    if (path === "/api/analytics/forget" && request.method === "POST")
      return await forgetVisitor(context);
    if (path === "/api/events" && request.method === "POST")
      return await recordEvents(context);
    if (path === "/api/admin/login" && request.method === "POST")
      return await login(context);
    if (path.startsWith("/api/admin/")) {
      const user = await requireAdmin(request, env);
      if (path === "/api/admin/session" && request.method === "GET") {
        await markInternalVisitor(request, env);
        return withCookies(
          json({
            authenticated: true,
            username: user.username,
            csrf: user.csrf,
            authMode: env.ADMIN_AUTH_MODE || "password",
          }),
          [await makeCookie(request, env, "lzz_internal", "yes", 30 * 86400)],
        );
      }
      if (path === "/api/admin/logout" && request.method === "POST")
        return await logout(request, env, user);
      if (path === "/api/admin/internal" && request.method === "POST")
        return await internalBrowser(context, user);
      await rateLimit(request, env, "admin-read", 240, 60, user.username);
      if (request.method === "GET") {
        if (path === "/api/admin/stats") return await overview(env, url);
        if (path === "/api/admin/options") return await options(env);
        if (path === "/api/admin/inquiries")
          return await listInquiries(env, url);
        if (path === "/api/admin/inquiries/export")
          return await exportInquiries(context, url, user);
        if (path === "/api/admin/visitors") return await visitors(env, url);
        if (path.match(/^\/api\/admin\/visitors\/[^/]+$/))
          return await journey(env, path.split("/").at(-1)!, url);
        if (path.match(/^\/api\/admin\/files\/[^/]+$/))
          return await downloadFile(context, path.split("/").at(-1)!, user);
        if (path.match(/^\/api\/admin\/inquiries\/[^/]+$/))
          return await inquiryDetail(env, path.split("/").at(-1)!);
      }
      const note = path.match(/^\/api\/admin\/inquiries\/([^/]+)\/notes$/);
      if (note && request.method === "POST")
        return await addNote(context, note[1], user);
      const detail = path.match(/^\/api\/admin\/inquiries\/([^/]+)$/);
      if (detail && request.method === "PATCH")
        return await updateInquiry(context, detail[1], user);
    }
    if (!["GET", "HEAD"].includes(request.method)) assertOrigin(request);
    throw new HttpError(404, "not_found", "接口不存在。");
  } catch (error) {
    if (error instanceof HttpError)
      return json(
        { error: error.code, message: error.publicMessage },
        error.status,
        error.status === 429
          ? { "Retry-After": String(error.retryAfter || 60) }
          : {},
      );
    // Never log request bodies, contact fields, drawings, passwords or cookies.
    console.error(
      "backend_request_failed",
      request.method,
      path,
      error instanceof Error ? error.name : "unknown",
    );
    return json(
      { error: "server", message: "服务暂时不可用，请稍后重试。" },
      503,
    );
  }
}

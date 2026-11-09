import type { Env } from "./types";
export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    public publicMessage: string,
    public retryAfter?: number,
  ) {
    super(code);
  }
}
export function json(data: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}
export function assertOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    throw new HttpError(403, "origin", "请求来源不被允许。");
}
export function isLocal(request: Request, env: Env) {
  return (
    env.LOCAL_DEVELOPMENT === "true" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(new URL(request.url).hostname)
  );
}
export function assertConfigured(request: Request, env: Env) {
  if (
    !env.DB ||
    !env.FILES ||
    !env.TOKEN_SECRET ||
    env.TOKEN_SECRET.length < 32 ||
    (env.LOCAL_DEVELOPMENT === "true" && !isLocal(request, env))
  )
    throw new HttpError(503, "not_configured", "服务尚未配置完成。");
}
export async function readJson(
  request: Request,
  maxBytes = 32000,
): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new HttpError(415, "content_type", "请使用 JSON 请求。");
  const bytes = await readLimited(request, maxBytes);
  try {
    const body = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw Error();
    return body;
  } catch {
    throw new HttpError(400, "invalid_json", "请求格式不正确。");
  }
}
export async function readLimited(request: Request, maxBytes: number) {
  const announced = Number(request.headers.get("content-length"));
  if (announced > maxBytes)
    throw new HttpError(413, "too_large", "请求超过大小限制。");
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > maxBytes) {
      await reader.cancel();
      throw new HttpError(413, "too_large", "请求超过大小限制。");
    }
    chunks.push(value);
  }
  const result = new Uint8Array(length);
  let position = 0;
  for (const chunk of chunks) {
    result.set(chunk, position);
    position += chunk.length;
  }
  return result;
}
export function limitedBody(request: Request, maxBytes: number) {
  if (Number(request.headers.get("content-length")) > maxBytes)
    throw new HttpError(413, "too_large", "请求超过大小限制。");
  if (!request.body) throw new HttpError(400, "payload", "表单为空。");
  let bytes = 0;
  return request.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        bytes += chunk.length;
        if (bytes > maxBytes)
          throw new HttpError(413, "too_large", "请求超过大小限制。");
        controller.enqueue(chunk);
      },
    }),
  );
}
export function text(value: unknown, max = 200) {
  return typeof value === "string"
    ? value
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
        .trim()
        .slice(0, max)
    : "";
}
export function routePath(value: unknown) {
  const valueText = text(value, 500);
  if (
    !/^\/[a-zA-Z0-9/_\-.]*\/?(?:#[a-zA-Z][\w-]*)?$/.test(valueText) ||
    valueText.startsWith("//") ||
    /\.\.|^\/(?:admin|api)(?:\/|$)/.test(valueText)
  )
    return "";
  return valueText.split("#")[0];
}
export function language(value: unknown) {
  const code = text(value, 12);
  return /^[a-z]{2,3}(?:-[a-zA-Z]{2,4})?$/.test(code) ? code : "unknown";
}
export function productOnPage(page: string) {
  return page.match(/^\/machined-parts\/gallery\/([a-z0-9-]+)\/$/)?.[1] || "";
}
export function cookie(request: Request, name: string) {
  return (
    request.headers
      .get("cookie")
      ?.split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith(name + "="))
      ?.slice(name.length + 1) || ""
  );
}
export function setCookie(
  request: Request,
  name: string,
  value: string,
  maxAge: number,
) {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
}
export function withCookies(response: Response, values: string[]) {
  const headers = new Headers(response.headers);
  for (const value of values) headers.append("Set-Cookie", value);
  return new Response(response.body, { status: response.status, headers });
}
export const uuid = (value: unknown) =>
  typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value);

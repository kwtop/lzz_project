import {
  attachmentPolicy,
  emptyInquiryFields,
  parseContact,
  validateAttachments,
  validateInquiry,
} from "../src/lib/inquiryForm";
import type { InquiryFields } from "../src/lib/inquiryForm";
import type { Context } from "./types";
import {
  assertOrigin,
  HttpError,
  json,
  language,
  limitedBody,
  routePath,
  text,
  uuid,
} from "./http";
import {
  internal,
  knownBot,
  random,
  rateLimit,
  sha256,
  verifyTurnstile,
} from "./security";
import {
  attribution,
  country,
  currentVisit,
  device,
  inquirySuccess,
} from "./analytics";
import catalog from "./catalog.generated.json";

const receipt = (id: string, duplicate = false) =>
  json({ status: "sent", reference: id, duplicate });
export async function receiveInquiry(context: Context) {
  const { request, env } = context;
  assertOrigin(request);
  if (knownBot(request)) throw new HttpError(400, "spam", "无法接受此提交。");
  const key = request.headers.get("idempotency-key");
  if (!uuid(key)) throw new HttpError(400, "request_key", "请刷新表单后重试。");
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data;"))
    throw new HttpError(415, "content_type", "提交格式不正确。");
  // Invalid forms and oversized uploads also consume an attempt limit.
  await rateLimit(request, env, "inquiry-attempt", 30, 60);
  const body = limitedBody(
    request,
    attachmentPolicy.maxTotalBytes + 1024 * 1024,
  );
  let data: FormData, payload: Record<string, unknown>;
  try {
    data = await new Request(request.url, {
      method: "POST",
      headers: request.headers,
      body,
    }).formData();
    payload = JSON.parse(String(data.get("payload") || ""));
    if (!payload || typeof payload !== "object" || Array.isArray(payload))
      throw Error();
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, "payload", "表单格式不正确。");
  }
  if (data.get("website")) throw new HttpError(400, "spam", "无法接受此提交。");
  const raw = payload.fields;
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    throw new HttpError(400, "validation", "请检查联系方式。");
  const input = raw as Record<string, unknown>;
  const fields = {
    ...emptyInquiryFields(),
    name: text(input.name, 101),
    company: text(input.company, 151),
    country: text(input.country, 101),
    method: input.method,
    phone: text(input.phone, 151),
    email: text(input.email, 151),
    partType: input.partType,
    processes: Array.isArray(input.processes)
      ? input.processes.slice(0, 8)
      : [],
    message: text(input.message, 4001),
  } as InquiryFields;
  const errors = validateInquiry(fields);
  if (Object.values(errors).some(Boolean))
    throw new HttpError(400, "validation", "请检查姓名、目的地及联系方式。");
  const contact = parseContact(fields.method, fields[fields.method])!;
  const company = text(input.company, 150),
    interest = text(payload.interest, 200);
  let source: Record<string, unknown> = {};
  if (
    payload.context &&
    typeof payload.context === "object" &&
    !Array.isArray(payload.context)
  )
    source = payload.context as Record<string, unknown>;
  const page = routePath(payload.page) || "/quote/",
    sourcePage = routePath(source.source);
  const product = text(payload.product, 181);
  if (product && !catalog.some((item) => item.id === product))
    throw new HttpError(
      400,
      "validation",
      "请选择有效的产品，或选择其他定制零件。",
    );
  const part = text(source.part, 200),
    lang = language(payload.language);
  const attachments = data.getAll("attachments");
  if (attachments.some((file) => typeof file === "string"))
    throw new HttpError(400, "attachment", "附件格式不正确。");
  const files = attachments as File[];
  if (validateAttachments(files).length)
    throw new HttpError(
      400,
      "attachment",
      "附件最多 5 个、总计 20 MB，请使用支持的格式。",
    );
  const prepared: {
    id: string;
    name: string;
    size: number;
    buffer: ArrayBuffer;
    hash: string;
    key: string;
  }[] = [];
  const id = random();
  for (const file of files) {
    const name = text(file.name.split(/[\\/]/).pop(), 180),
      buffer = await file.arrayBuffer(),
      extension = name.split(".").pop()?.toLowerCase();
    const header = new Uint8Array(buffer.slice(0, 8));
    const signatures: Record<string, number[]> = {
      pdf: [37, 80, 68, 70, 45],
      png: [137, 80, 78, 71, 13, 10, 26, 10],
      jpg: [255, 216, 255],
    };
    const expected = signatures[extension || ""];
    if (expected && !expected.every((value, index) => header[index] === value))
      throw new HttpError(400, "attachment", "附件内容与文件扩展名不符。");
    const fileId = random();
    prepared.push({
      id: fileId,
      name,
      size: file.size,
      buffer,
      hash: await sha256(buffer),
      key: "inquiries/" + id + "/" + fileId + "." + extension,
    });
  }
  const fingerprint = await sha256(
    JSON.stringify({
      name: fields.name,
      company,
      country: fields.country,
      contact,
      product,
      interest: interest || part,
      partType: fields.partType,
      processes: [...fields.processes].sort(),
      message: fields.message,
      files: prepared
        .map((file) => ({ name: file.name, size: file.size, hash: file.hash }))
        .sort((a, b) => a.hash.localeCompare(b.hash)),
    }),
  );
  const existing = await env.DB.prepare(
    "SELECT id,payload_hash FROM inquiries WHERE request_key=?",
  )
    .bind(key)
    .first<{ id: string; payload_hash: string }>();
  if (existing) {
    if (existing.payload_hash !== fingerprint)
      throw new HttpError(409, "request_changed", "请重新提交已修改的表单。");
    return receipt(existing.id, true);
  }
  const prior = await env.DB.prepare(
    "SELECT i.id FROM inquiry_dedupes d JOIN inquiries i ON i.id=d.inquiry_id WHERE d.payload_hash=? AND d.expires_at>?",
  )
    .bind(fingerprint, Date.now())
    .first<{ id: string }>();
  if (prior) return receipt(prior.id, true);
  await rateLimit(request, env, "inquiry", 10, 60);
  await rateLimit(request, env, "inquiry-hour", 60, 3600);
  await verifyTurnstile(request, env, String(data.get("turnstile") || ""));
  let visit = null;
  try {
    visit =
      (payload.analyticsEnabled === true ||
        (payload.analyticsEnabled === undefined && payload.analyticsConsent === true))
        ? await currentVisit(request, env)
        : null;
  } catch {
    /* Inquiry storage works without analytics. */
  }
  const excluded = Number((await internal(request, env)) || !!visit?.internal);
  const tracking = attribution(request, payload),
    now = Date.now();
  const uploads: string[] = [];
  let saved = false;
  try {
    for (const file of prepared) {
      uploads.push(file.key);
      await env.FILES.put(file.key, file.buffer, {
        httpMetadata: { contentType: "application/octet-stream" },
        customMetadata: { sha256: file.hash },
      });
    }
    const statements = [
      env.DB.prepare(
        "INSERT INTO inquiry_dedupes(payload_hash,inquiry_id,expires_at) SELECT ?,?,? WHERE NOT EXISTS(SELECT 1 FROM inquiries WHERE request_key=?) ON CONFLICT(payload_hash) DO UPDATE SET inquiry_id=excluded.inquiry_id,expires_at=excluded.expires_at WHERE inquiry_dedupes.expires_at<=?",
      ).bind(fingerprint, id, now + 15 * 60000, key, now),
      env.DB.prepare(
        "INSERT INTO inquiries(id,request_key,payload_hash,created_at,updated_at,name,company,email,phone,contact_method,destination_country,interest,product,part_type,processes,requirements,page,source_page,language,visitor_id,visit_id,source,channel,country,device,internal) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM inquiry_dedupes WHERE payload_hash=? AND inquiry_id=?) ON CONFLICT(request_key) DO NOTHING",
      ).bind(
        id,
        key,
        fingerprint,
        now,
        now,
        fields.name,
        company,
        contact.kind === "email" ? contact.value : "",
        contact.kind === "phone" ? contact.value : "",
        contact.kind,
        fields.country,
        interest || part,
        product,
        fields.partType,
        JSON.stringify(fields.processes),
        fields.message,
        page,
        sourcePage,
        lang,
        visit?.visitor_id || null,
        visit?.id || null,
        visit?.source || tracking.source,
        visit?.channel || tracking.channel,
        country(request),
        device(request),
        excluded,
        fingerprint,
        id,
      ),
      ...prepared.map((file) =>
        env.DB.prepare(
          "INSERT INTO inquiry_files(id,inquiry_id,name,size,object_key,sha256) SELECT ?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM inquiries WHERE id=?)",
        ).bind(file.id, id, file.name, file.size, file.key, file.hash, id),
      ),
    ];
    const results = await env.DB.batch(statements);
    saved = results[1].meta.changes === 1;
    if (!saved) {
      const duplicate = await env.DB.prepare(
        "SELECT id,payload_hash FROM inquiries WHERE request_key=? OR id=(SELECT inquiry_id FROM inquiry_dedupes WHERE payload_hash=?) ORDER BY created_at DESC LIMIT 1",
      )
        .bind(key, fingerprint)
        .first<{ id: string; payload_hash: string }>();
      if (duplicate && duplicate.payload_hash === fingerprint)
        return receipt(duplicate.id, true);
      if (duplicate)
        throw new HttpError(409, "request_changed", "请重新提交已修改的表单。");
      throw new HttpError(503, "save_failed", "询盘未能保存，请重试。");
    }
    context.waitUntil(
      inquirySuccess(env, visit, id, page, product, lang, excluded).catch(
        () => {},
      ),
    );
    return receipt(id);
  } finally {
    if (!saved && uploads.length) {
      // A lost database response can follow a committed transaction. Keep its files.
      let absent = false;
      try {
        absent = !(await env.DB.prepare("SELECT id FROM inquiries WHERE id=?")
          .bind(id)
          .first());
      } catch {
        /* Keep private files when persistence cannot be checked. */
      }
      if (absent)
        try {
          await env.FILES.delete(uploads);
        } catch {
          context.waitUntil(env.FILES.delete(uploads).catch(() => {}));
        }
    }
  }
}

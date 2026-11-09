import type { InquiryContext } from "./inquiryContext";
import type {
  InquiryContact,
  InquiryPartType,
  InquiryProcess,
} from "./inquiryForm";
import { inquiryAttribution } from "./siteAnalytics";

export type InquirySubmission = {
  name: string;
  company?: string;
  product?: string;
  interest?: string;
  requestKey?: string;
  turnstile?: string;
  website?: string;
  destinationCountry: string;
  contact: InquiryContact;
  partType: InquiryPartType | "";
  processes: readonly InquiryProcess[];
  message: string;
  attachments: readonly File[];
  context: InquiryContext;
};

export type InquiryResult =
  | { status: "sent"; reference?: string }
  | { status: "failed"; code?: string }
  | { status: "unavailable" };
export type InquiryAdapter = (
  submission: InquirySubmission,
) => Promise<InquiryResult>;

export type InquiryConfiguration = {
  connected: boolean;
  captchaSiteKey: string;
  local: boolean;
  adminAuthMode?: string;
};
export async function inquiryConfiguration(): Promise<InquiryConfiguration> {
  try {
    const response = await fetch("/api/config", {
      credentials: "same-origin",
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw Error();
    const value = await response.json();
    return {
      connected: value.connected === true,
      captchaSiteKey:
        typeof value.captchaSiteKey === "string" ? value.captchaSiteKey : "",
      local: value.local === true,
      adminAuthMode: value.adminAuthMode,
    };
  } catch {
    return { connected: false, captchaSiteKey: "", local: false };
  }
}
export const inquiryAdapter: InquiryAdapter = async (submission) => {
  const body = new FormData(),
    snapshot = inquiryAttribution();
  body.append(
    "payload",
    JSON.stringify({
      fields: {
        name: submission.name,
        company: submission.company || "",
        country: submission.destinationCountry,
        method: submission.contact.kind,
        phone:
          submission.contact.kind === "phone" ? submission.contact.value : "",
        email:
          submission.contact.kind === "email" ? submission.contact.value : "",
        partType: submission.partType,
        processes: submission.processes,
        message: submission.message,
      },
      product: submission.product || "",
      interest: submission.interest || submission.context.part,
      context: submission.context,
      ...snapshot,
    }),
  );
  for (const file of submission.attachments)
    body.append("attachments", file, file.name);
  body.append("turnstile", submission.turnstile || "");
  body.append("website", submission.website || "");
  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Idempotency-Key": submission.requestKey || crypto.randomUUID(),
      },
      body,
      credentials: "same-origin",
      signal: AbortSignal.timeout(120000),
    });
    const result = await response.json();
    if (
      response.ok &&
      result.status === "sent" &&
      typeof result.reference === "string"
    )
      return { status: "sent", reference: result.reference };
    if (response.status === 404 || result.error === "not_configured")
      return { status: "unavailable" };
    return {
      status: "failed",
      code: typeof result.error === "string" ? result.error : "server",
    };
  } catch {
    return { status: "failed", code: "network" };
  }
};

export async function submitInquiry(
  submission: InquirySubmission,
  adapter: InquiryAdapter = inquiryAdapter,
): Promise<InquiryResult> {
  try {
    const result = await adapter(submission);
    if (
      result?.status === "sent" ||
      result?.status === "failed" ||
      result?.status === "unavailable"
    )
      return result;
    return { status: "failed" };
  } catch {
    return { status: "failed" };
  }
}

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  MapPin,
  Paperclip,
  X,
} from "lucide-react";
import { resolveInquiry } from "../lib/inquiryContext";
import type { InquiryContext, InquiryReference } from "../lib/inquiryContext";
import {
  attachmentAccept,
  attachmentFormatsLabel,
  attachmentPolicy,
  attachmentTotalLimitLabel,
  emptyInquiryFields,
  formatFileSize,
  inquiryLimits,
  inquiryPartTypes,
  machiningProcesses,
  parseContact,
  toggleInquiryProcess,
  validateAttachments,
  validateInquiry,
} from "../lib/inquiryForm";
import type {
  ContactMethod,
  InquiryErrors,
  InquiryFields,
  InquiryProcess,
} from "../lib/inquiryForm";
import { submitInquiry, inquiryConfiguration } from "../lib/inquirySubmission";
import type { InquiryConfiguration } from "../lib/inquirySubmission";
import InquiryCaptcha from "./InquiryCaptcha";
import { trackEvent } from "../lib/siteAnalytics";
import type { InquiryAdapter, InquiryResult } from "../lib/inquirySubmission";

type SubmissionState = "idle" | "submitting" | InquiryResult["status"];
type Props = { references: InquiryReference[]; adapter?: InquiryAdapter };

export default function QuoteForm({ references, adapter }: Props) {
  const [context, setContext] = useState<InquiryContext>({
    part: "",
    source: "",
  });
  const [fields, setFields] = useState<InquiryFields>(emptyInquiryFields);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [state, setState] = useState<SubmissionState>("idle");
  const [ready, setReady] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [configuration, setConfiguration] = useState<InquiryConfiguration>();
  const [captcha, setCaptcha] = useState("");
  const [captchaAttempt, setCaptchaAttempt] = useState(0);
  const [failureCode, setFailureCode] = useState("");
  const requestKey = useRef("");
  const sending = useRef(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const contactInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const fileButton = useRef<HTMLButtonElement>(null);
  const result = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const entry = resolveInquiry(window.location.search, references);
    setContext(entry);
    setFields((current) => ({
      ...current,
      product: entry.reference?.kind === "product" ? entry.reference.id : "",
      partType: entry.reference?.partType || "",
      processes: [...(entry.reference?.processes || [])],
    }));
    setReady(true);
    if (!adapter) void inquiryConfiguration().then(setConfiguration);
  }, [references]);

  useEffect(() => {
    if (state === "sent" || state === "failed" || state === "unavailable")
      result.current?.focus({ preventScroll: true });
  }, [state]);

  function update<K extends keyof InquiryFields>(
    key: K,
    value: InquiryFields[K],
  ) {
    requestKey.current = "";
    const next = { ...fields, [key]: value };
    setFields(next);
    setErrors((current) => ({
      ...current,
      [key]: current[key] ? validateInquiry(next)[key] : undefined,
    }));
    if (state !== "idle") setState("idle");
  }

  function chooseMethod(method: ContactMethod) {
    requestKey.current = "";
    setFields((current) => ({ ...current, method }));
    setErrors((current) => ({
      ...current,
      phone: undefined,
      email: undefined,
      method: undefined,
    }));
    if (state !== "idle") setState("idle");
  }

  function chooseProcess(value: InquiryProcess) {
    requestKey.current = "";
    setFields((current) => ({
      ...current,
      processes: toggleInquiryProcess(current.processes, value),
    }));
    setErrors((current) => ({ ...current, processes: undefined }));
    if (state !== "idle") setState("idle");
  }

  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    requestKey.current = "";
    const incoming = Array.from(event.currentTarget.files || []);
    event.currentTarget.value = "";
    if (!incoming.length) return;
    const combined = [...files, ...incoming];
    const nextErrors = validateAttachments(combined);
    setFileErrors(nextErrors);
    if (!nextErrors.length) setFiles(combined);
    if (state !== "idle") setState("idle");
  }

  function removeFile(index: number) {
    requestKey.current = "";
    setFiles((current) => current.filter((_, position) => position !== index));
    setFileErrors([]);
    if (state !== "idle") setState("idle");
  }

  async function send(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !ready ||
      sending.current ||
      state === "sent" ||
      (!adapter && !configuration)
    )
      return;
    const nextErrors = validateInquiry(fields);
    const nextFileErrors = validateAttachments(files);
    setErrors(nextErrors);
    setFileErrors(nextFileErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      trackEvent("form_error", {
        position: "quote-form",
        errorCode: "validation",
      });
      const first = (
        [
          "name",
          "company",
          "country",
          fields.method,
          "product",
          "partType",
          "processes",
          "message",
        ] as const
      ).find((key) => nextErrors[key]);
      if (first === "phone" || first === "email") contactInput.current?.focus();
      else if (first === "processes")
        event.currentTarget
          .querySelector<HTMLInputElement>('[name="processes"]')
          ?.focus();
      else if (first)
        (event.currentTarget.elements.namedItem(first) as HTMLElement)?.focus();
      return;
    }
    if (nextFileErrors.length) {
      trackEvent("form_error", {
        position: "quote-form",
        errorCode: "attachment",
      });
      fileButton.current?.focus();
      return;
    }
    const contact = parseContact(fields.method, fields[fields.method]);
    if (!contact) return;
    if (!adapter && configuration?.captchaSiteKey && !captcha) {
      setState("failed");
      setFailureCode("captcha");
      trackEvent("form_error", {
        position: "quote-form",
        errorCode: "captcha",
      });
      return;
    }
    const form = event.currentTarget;
    sending.current = true;
    setState("submitting");
    requestKey.current ||= crypto.randomUUID();
    const selected = references.find(
      (item) => item.kind === "product" && item.id === fields.product,
    );
    const outcome = await submitInquiry(
      {
        name: fields.name.trim(),
        company: fields.company.trim(),
        product: fields.product,
        interest: selected?.title || context.part,
        destinationCountry: fields.country.trim().replace(/\s+/g, " "),
        contact,
        partType: fields.partType,
        processes: [...fields.processes],
        message: fields.message.trim(),
        attachments: files,
        context,
        requestKey: requestKey.current,
        turnstile: captcha,
        website:
          (form.elements.namedItem("website") as HTMLInputElement)?.value || "",
      },
      adapter,
    );
    if (outcome.status !== "sent") {
      const code =
        outcome.status === "failed" ? outcome.code || "server" : "unavailable";
      setFailureCode(code);
      trackEvent("form_error", {
        position: "quote-form",
        errorCode: [
          "network",
          "captcha",
          "rate_limit",
          "attachment",
          "validation",
        ].includes(code)
          ? code
          : "server",
      });
      setCaptchaAttempt((value) => value + 1);
    }
    setReceipt(outcome.status === "sent" ? outcome.reference || "" : "");
    setState(outcome.status);
    sending.current = false;
  }

  function startAgain() {
    requestKey.current = "";
    setCaptchaAttempt((value) => value + 1);
    setFields({
      ...emptyInquiryFields(context.reference),
      product:
        context.reference?.kind === "product" ? context.reference.id : "",
    });
    setFiles([]);
    setErrors({});
    setFileErrors([]);
    setReceipt("");
    setState("idle");
    requestAnimationFrame(() => nameInput.current?.focus());
  }

  const busy = state === "submitting";
  const totalBytes = files.reduce((total, file) => total + file.size, 0);
  return (
    <div className="inquiry-layout inquiry-workspace">
      <header className="inquiry-context" data-core-section="Send an inquiry">
        <h1>Tell us about your part</h1>
        <p className="inquiry-lead">
          Start with your name, destination country and contact details.
          You can add part details or a drawing when they are available.
        </p>
        <p className="inquiry-reply">
          <strong>We reply within 12 hours.</strong> This is the first human reply
          after we receive your inquiry. We may need more drawing or machining
          details before preparing a complete quote.
        </p>
        {!adapter && configuration && !configuration.connected && (
          <p className="inquiry-availability">
            <strong>Online submission is currently unavailable.</strong> Please
            use <a href="mailto:roger@lzz-cnc.com">email</a> or{" "}
            <a
              href="https://wa.me/8613858102479"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>{" "}
            if you need to send an inquiry now. Your entries remain on this page
            until you submit.
          </p>
        )}
      </header>

      <div
        className="inquiry-panel"
        data-core-section="Contact and optional part information"
      >
        {(context.part || context.source) && (
          <div className="inquiry-reference" aria-label="Inquiry context">
            <p>
              {context.reference?.kind === "product"
                ? "About this part example"
                : context.reference?.kind === "capability"
                  ? "Machining service"
                  : "About your inquiry"}
            </p>
            {context.part && <h2>{context.part}</h2>}
            {context.source && (
              <a href={context.source}>
                View source page <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
            <span>Included with your inquiry.</span>
          </div>
        )}
        <h2 id="inquiry-heading" className="sr-only">
          Your inquiry
        </h2>
        <form
          className="inquiry-form"
          aria-labelledby="inquiry-heading"
          aria-busy={busy}
          onSubmit={send}
          noValidate
        >
          <fieldset disabled={!ready || busy || state === "sent"}>
            <legend className="sr-only">
              Contact details, part requirements and files
            </legend>
            <div className="inquiry-person-row">
              <div className="inquiry-field">
                <label htmlFor="inquiry-name">
                  Your name <span className="inquiry-required">(required)</span>
                </label>
                <input
                  ref={nameInput}
                  id="inquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={inquiryLimits.name}
                  value={fields.name}
                  onChange={(event) => update("name", event.target.value)}
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      name: validateInquiry(fields).name,
                    }))
                  }
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "inquiry-name-error" : undefined
                  }
                />
                {errors.name && (
                  <p
                    id="inquiry-name-error"
                    className="inquiry-field-error"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-country">
                  Destination country{" "}
                  <span className="inquiry-required">(required)</span>
                </label>
                <input
                  id="inquiry-country"
                  name="country"
                  type="text"
                  autoComplete="off"
                  required
                  maxLength={inquiryLimits.country}
                  value={fields.country}
                  onChange={(event) => update("country", event.target.value)}
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      country: validateInquiry(fields).country,
                    }))
                  }
                  placeholder="Enter destination country"
                  aria-invalid={!!errors.country}
                  aria-describedby={
                    errors.country ? "inquiry-country-error" : undefined
                  }
                />
                {errors.country && (
                  <p
                    id="inquiry-country-error"
                    className="inquiry-field-error"
                    role="alert"
                  >
                    {errors.country}
                  </p>
                )}
              </div>
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-company">
                Company <span className="inquiry-optional">(optional)</span>
              </label>
              <input
                id="inquiry-company"
                type="text"
                name="company"
                autoComplete="organization"
                maxLength={inquiryLimits.company}
                value={fields.company}
                onChange={(event) => update("company", event.target.value)}
                placeholder="Your company name"
                aria-invalid={!!errors.company}
              />
              {errors.company && (
                <p className="inquiry-field-error" role="alert">
                  {errors.company}
                </p>
              )}
            </div>
            <fieldset className="inquiry-contact-method">
              <legend>How should we reply?</legend>
              <div className="inquiry-method-options">
                <label
                  className={fields.method === "phone" ? "is-selected" : ""}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="method"
                    value="phone"
                    checked={fields.method === "phone"}
                    onChange={() => chooseMethod("phone")}
                  />
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>WhatsApp / Phone</span>
                </label>
                <label
                  className={fields.method === "email" ? "is-selected" : ""}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="method"
                    value="email"
                    checked={fields.method === "email"}
                    onChange={() => chooseMethod("email")}
                  />
                  <Mail size={18} aria-hidden="true" />
                  <span>Email</span>
                </label>
              </div>
              <div className="inquiry-field inquiry-contact-value">
                <label htmlFor="inquiry-contact">
                  {fields.method === "phone"
                    ? "WhatsApp / Phone number"
                    : "Email address"}{" "}
                  <span className="inquiry-required">(required)</span>
                </label>
                <input
                  ref={contactInput}
                  id="inquiry-contact"
                  name={fields.method}
                  type={fields.method === "phone" ? "tel" : "email"}
                  inputMode={fields.method === "phone" ? "tel" : "email"}
                  autoComplete={fields.method === "phone" ? "tel" : "email"}
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  maxLength={inquiryLimits.contact}
                  value={fields[fields.method]}
                  onChange={(event) =>
                    update(fields.method, event.target.value)
                  }
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      [fields.method]: validateInquiry(fields)[fields.method],
                    }))
                  }
                  placeholder={
                    fields.method === "phone"
                      ? "+44 7700 900123"
                      : "you@company.com"
                  }
                  aria-invalid={!!errors[fields.method]}
                  aria-describedby={
                    "inquiry-contact-help" +
                    (errors[fields.method] ? " inquiry-contact-error" : "")
                  }
                />
                <p id="inquiry-contact-help" className="inquiry-field-help">
                  {fields.method === "phone"
                    ? "Include your country code. We can reply by WhatsApp or phone."
                    : "We will reply to this email address."}
                </p>
                {errors[fields.method] && (
                  <p
                    id="inquiry-contact-error"
                    className="inquiry-field-error"
                    role="alert"
                  >
                    {errors[fields.method]}
                  </p>
                )}
              </div>
            </fieldset>
            <fieldset className="inquiry-part-fields">
              <legend>
                About your part{" "}
                <span className="inquiry-optional">(optional)</span>
              </legend>
              <div className="inquiry-field">
                <label htmlFor="inquiry-product">Product or part example</label>
                <select
                  id="inquiry-product"
                  name="product"
                  value={fields.product}
                  onChange={(event) => update("product", event.target.value)}
                >
                  <option value="">Not sure / a different custom part</option>
                  {references
                    .filter((item) => item.kind === "product")
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-part-type">Part type</label>
                <select
                  id="inquiry-part-type"
                  name="partType"
                  value={fields.partType}
                  onChange={(event) =>
                    update(
                      "partType",
                      event.target.value as InquiryFields["partType"],
                    )
                  }
                  aria-invalid={!!errors.partType}
                  aria-describedby={
                    errors.partType ? "inquiry-part-type-error" : undefined
                  }
                >
                  <option value="">Select a part type</option>
                  {inquiryPartTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.partType && (
                  <p
                    id="inquiry-part-type-error"
                    className="inquiry-field-error"
                    role="alert"
                  >
                    {errors.partType}
                  </p>
                )}
              </div>
              <fieldset className="inquiry-process-field">
                <legend>Machining process</legend>
                <p className="inquiry-field-help" id="inquiry-process-help">
                  Choose all that apply. You can also select “Not sure yet”.
                </p>
                <div
                  className="inquiry-process-options"
                  aria-describedby="inquiry-process-help"
                >
                  {machiningProcesses.map((process) => (
                    <label
                      key={process.value}
                      className={
                        fields.processes.includes(process.value)
                          ? "is-selected"
                          : ""
                      }
                    >
                      <input
                        type="checkbox"
                        name="processes"
                        value={process.value}
                        checked={fields.processes.includes(process.value)}
                        onChange={() => chooseProcess(process.value)}
                      />
                      <span>{process.label}</span>
                    </label>
                  ))}
                </div>
                {errors.processes && (
                  <p className="inquiry-field-error" role="alert">
                    {errors.processes}
                  </p>
                )}
              </fieldset>
            </fieldset>
            <div className="inquiry-field">
              <label htmlFor="inquiry-message">
                Message <span className="inquiry-optional">(optional)</span>
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={5}
                maxLength={inquiryLimits.message}
                value={fields.message}
                onChange={(event) => update("message", event.target.value)}
                placeholder="What would you like us to make? Material, quantity and any critical features are helpful."
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "inquiry-message-error" : undefined
                }
              />
              {errors.message && (
                <p
                  id="inquiry-message-error"
                  className="inquiry-field-error"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>
            <div className="inquiry-field inquiry-attachments">
              <label htmlFor="inquiry-choose-files">
                Drawings or files{" "}
                <span className="inquiry-optional">(optional)</span>
              </label>
              <div className="inquiry-file-picker">
                <Paperclip size={21} aria-hidden="true" />
                <button
                  ref={fileButton}
                  id="inquiry-choose-files"
                  className="inquiry-file-button"
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  aria-describedby={
                    "inquiry-files-status inquiry-files-help" +
                    (fileErrors.length ? " inquiry-file-errors" : "")
                  }
                  aria-invalid={fileErrors.length > 0}
                >
                  Choose files
                </button>
                <span
                  id="inquiry-files-status"
                  className="inquiry-file-status"
                  role="status"
                >
                  {files.length
                    ? `${files.length} ${files.length === 1 ? "file" : "files"} selected`
                    : "No files selected"}
                </span>
                <input
                  ref={fileInput}
                  id="inquiry-files"
                  name="attachments"
                  type="file"
                  hidden
                  multiple
                  accept={attachmentAccept}
                  onChange={chooseFiles}
                  aria-label="Drawings or files"
                />
              </div>
              <p id="inquiry-files-help" className="inquiry-field-help">
                Up to {attachmentPolicy.maxFiles} files,{" "}
                {attachmentTotalLimitLabel} total. {attachmentFormatsLabel}.
              </p>
              {files.length > 0 && (
                <>
                  <ul className="inquiry-file-list" aria-label="Selected files">
                    {files.map((file, index) => (
                      <li key={file.name + file.size + index}>
                        <span>
                          <strong>{file.name}</strong>
                          <span>{formatFileSize(file.size)}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          aria-label={"Remove " + file.name}
                        >
                          <X size={18} aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="inquiry-file-total" aria-live="polite">
                    {files.length} of {attachmentPolicy.maxFiles} files ·{" "}
                    {formatFileSize(totalBytes)} of {attachmentTotalLimitLabel}{" "}
                    selected
                  </p>
                </>
              )}
              {fileErrors.length > 0 && (
                <div
                  className="inquiry-field-error"
                  id="inquiry-file-errors"
                  role="alert"
                >
                  <p>
                    Those files were not added. Your earlier selection is
                    unchanged.
                  </p>
                  <ul>
                    {fileErrors.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="inquiry-form-actions">
              {configuration?.captchaSiteKey && state !== "sent" && (
                <InquiryCaptcha
                  siteKey={configuration.captchaSiteKey}
                  attempt={captchaAttempt}
                  onToken={setCaptcha}
                />
              )}
              <button
                className="inquiry-primary"
                type="submit"
                disabled={
                  !ready ||
                  busy ||
                  state === "sent" ||
                  (!adapter && !configuration)
                }
              >
                {busy ? (
                  <>
                    <span className="site-state-spinner" aria-hidden="true" />
                    Sending inquiry…
                  </>
                ) : (
                  <>
                    Send inquiry <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="inquiry-send-note">
                Submitting sends your details and selected files to LZZ for
                follow-up.{" "}
                <a href="/privacy/#your-inquiry">Privacy and file handling</a>
              </p>
            </div>
          </fieldset>
          <div className="inquiry-honeypot" aria-hidden="true">
            <label htmlFor="inquiry-website">Website</label>
            <input
              id="inquiry-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {!ready && (
            <p className="inquiry-field-help" role="status">
              Loading the form…
            </p>
          )}
          <div
            className={
              "inquiry-result" +
              (state === "idle" || busy ? " inquiry-result-empty" : "")
            }
            ref={result}
            tabIndex={-1}
            role={
              state === "failed" || state === "unavailable" ? "alert" : "status"
            }
            aria-live="polite"
          >
            {busy && (
              <p>
                Your inquiry is being submitted. Please keep this page open.
              </p>
            )}
            {state === "unavailable" && (
              <>
                <h3>Online submission is currently unavailable</h3>
                <p>
                  We could not submit your inquiry. Your details and selected
                  files are still here.
                </p>
                <p>
                  Please <a href="mailto:roger@lzz-cnc.com">email us</a> or{" "}
                  <a
                    href="https://wa.me/8613858102479"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    contact us on WhatsApp
                  </a>{" "}
                  to send your inquiry and files.
                </p>
              </>
            )}
            {state === "failed" && (
              <>
                <h3>We could not confirm your inquiry</h3>
                <p>
                  {failureCode === "captcha"
                    ? "Complete the verification, then send your inquiry again."
                    : failureCode === "rate_limit"
                      ? "Please wait before trying again. Your entries and files are still here."
                      : "We could not confirm your inquiry was saved. Your entries and files are still here. Retrying will not create a duplicate."}{" "}
                  You can also contact us by{" "}
                  <a href="mailto:roger@lzz-cnc.com">email</a> or{" "}
                  <a
                    href="https://wa.me/8613858102479"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </>
            )}
            {state === "sent" && (
              <>
                <h3>Inquiry sent</h3>
                <p>Thank you. We reply within 12 hours.</p>
                {receipt && (
                  <p>
                    Inquiry reference: <strong>{receipt}</strong>
                  </p>
                )}
                <button
                  className="inquiry-text-action"
                  type="button"
                  onClick={startAgain}
                >
                  Send another inquiry
                </button>
              </>
            )}
          </div>
          <noscript>
            <p className="inquiry-noscript">
              To use this form, enable JavaScript. You can also{" "}
              <a href="mailto:roger@lzz-cnc.com">email LZZ</a> or{" "}
              <a href="https://wa.me/8613858102479">contact us on WhatsApp</a>{" "}
              directly.
            </p>
          </noscript>
        </form>
      </div>

      <aside
        className="inquiry-help"
        data-core-section="Direct contact and inquiry help"
      >
        <h2>Contact LZZ directly</h2>
        <p>
          Send drawings or discuss a sample using the contact details below.
        </p>
        <address className="inquiry-contacts" aria-label="Contact LZZ">
          <a className="inquiry-contact-row" href="mailto:roger@lzz-cnc.com">
            <Mail size={22} strokeWidth={1.6} aria-hidden="true" />
            <span>
              <strong>Email</strong>
              <span>roger@lzz-cnc.com</span>
            </span>
          </a>
          <a
            className="inquiry-contact-row"
            href="https://wa.me/8613858102479"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={22} strokeWidth={1.6} aria-hidden="true" />
            <span>
              <strong>WhatsApp</strong>
              <span>+86 138 5810 2479</span>
            </span>
          </a>
          <a className="inquiry-contact-row" href="/about/contact/">
            <MapPin size={22} strokeWidth={1.6} aria-hidden="true" />
            <span>
              <strong>Hangzhou, China</strong>
              <span>Contact details &amp; workshop visits</span>
            </span>
          </a>
        </address>
        <div className="inquiry-help-note">
          <h3>Have a drawing?</h3>
          <p>
            A drawing, material and quantity help us assess the machining route.
            If you are starting with a sample or an idea, tell us what you have.
          </p>
        </div>
      </aside>
    </div>
  );
}

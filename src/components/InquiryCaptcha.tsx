import { useEffect, useRef, useState } from "react";
type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
let loaded: Promise<void> | undefined;
function load() {
  return (loaded ??= (async () => {
    if ((window as Window & { turnstile?: Turnstile }).turnstile) return;
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        loaded = undefined;
        reject(Error());
      };
      document.head.append(script);
    });
  })());
}
export default function InquiryCaptcha({
  siteKey,
  attempt,
  onToken,
}: {
  siteKey: string;
  attempt: number;
  onToken: (value: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null),
    callback = useRef(onToken);
  callback.current = onToken;
  const [failed, setFailed] = useState(false),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    let stopped = false,
      id = "";
    setFailed(false);
    callback.current("");
    void load()
      .then(() => {
        if (stopped || !container.current) return;
        const widget = (window as Window & { turnstile?: Turnstile }).turnstile;
        if (!widget) throw Error();
        id = widget.render(container.current, {
          sitekey: siteKey,
          action: "inquiry",
          size: container.current.clientWidth < 320 ? "compact" : "flexible",
          callback: (token: string) => callback.current(token),
          "expired-callback": () => callback.current(""),
          "error-callback": () => {
            callback.current("");
            setFailed(true);
          },
        });
      })
      .catch(() => {
        if (!stopped) setFailed(true);
      });
    return () => {
      stopped = true;
      if (id)
        (window as Window & { turnstile?: Turnstile }).turnstile?.remove(id);
    };
  }, [siteKey, attempt, retry]);
  return (
    <div className="inquiry-captcha">
      <div ref={container} />
      {failed && (
        <p role="alert">
          Verification could not load.{" "}
          <button type="button" onClick={() => setRetry((value) => value + 1)}>
            Try again
          </button>
        </p>
      )}
    </div>
  );
}

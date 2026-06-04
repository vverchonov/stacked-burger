declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const LEAD_FORM_CONVERSION = "AW-18203224901/kOpSCKDqzrgcEMXW_OdD";

export function reportLeadFormConversion() {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: LEAD_FORM_CONVERSION,
  });
}

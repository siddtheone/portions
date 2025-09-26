// Google Analytics configuration
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
export const GA_TRACKING_ID = "G-XPZ4QRHDV3";

// Send custom event
export const gtagEvent = (params: string): void => {
  if (typeof window !== "undefined" && (window as Window).gtag) {
    window.gtag("event", "pdf_interaction", params);
  }
};

// Track interactions
export const trackAction = (params: "cookware_add") => {
  gtagEvent(params);
};

// Declare global types
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

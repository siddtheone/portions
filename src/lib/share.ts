export const hasNativeShareBridge = () =>
  typeof window !== "undefined" &&
  typeof window.ReactNativeWebView?.postMessage === "function";

export const resolveShareTargetUrl = (playStoreUrl: string) =>
  hasNativeShareBridge()
    ? playStoreUrl
    : typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "";


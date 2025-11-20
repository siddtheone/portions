"use client";

import { PLAY_STORE_URL, SHARE_TEXT, SHARE_TITLE } from "@/constants";
import { Link, ListItem } from "@mui/material";
import { useState } from "react";
import { hasNativeShareBridge, resolveShareTargetUrl } from "@/lib/share";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(message: string): void;
    };
  }
}

export function ShareAppLink() {
  const [copied, setCopied] = useState(false);

  const resetCopiedState = () => {
    setTimeout(() => setCopied(false), 2500);
  };

  const copyLinkFallback = async (targetUrl: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(targetUrl);
        setCopied(true);
        resetCopiedState();
        return;
      }
    } catch (error) {
      console.warn("Unable to copy share link", error);
    }

    window.prompt("Share this link", targetUrl);
  };

  const handleShare = async () => {
    const targetUrl = resolveShareTargetUrl(PLAY_STORE_URL);

    if (hasNativeShareBridge()) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "share",
          payload: {
            title: SHARE_TITLE,
            text: SHARE_TEXT,
            url: targetUrl,
          },
        })
      );
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: targetUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.warn("navigator.share failed, falling back to copy", error);
      }
    }

    await copyLinkFallback(targetUrl);
  };

  const label = copied ? "Link copied" : "Share the app";

  return (
    <ListItem>
      <Link
        component="button"
        type="button"
        onClick={handleShare}
        underline="hover"
      >
        {label}
      </Link>
    </ListItem>
  );
}

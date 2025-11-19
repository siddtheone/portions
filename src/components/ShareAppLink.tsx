"use client";

import {
  PLAY_STORE_URL,
  SHARE_TEXT,
  SHARE_TITLE,
  WEB_APP_URL,
} from "@/constants";
import { Link, ListItem } from "@mui/material";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(message: string): void;
    };
  }
}

const SHARE_FALLBACK_RESET_MS = 2500;

export function ShareAppLink() {
  const [isNativeShell, setIsNativeShell] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsNativeShell(
      typeof window !== "undefined" && Boolean(window.ReactNativeWebView)
    );
  }, []);

  const targetUrl = useMemo(() => {
    if (isNativeShell) {
      return PLAY_STORE_URL;
    }

    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }

    return WEB_APP_URL;
  }, [isNativeShell]);

  const resetCopiedState = useCallback(() => {
    setTimeout(() => setCopied(false), SHARE_FALLBACK_RESET_MS);
  }, []);

  const copyLinkFallback = useCallback(async () => {
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
  }, [resetCopiedState, targetUrl]);

  const handleShare = useCallback(async () => {
    if (isNativeShell) {
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

    await copyLinkFallback();
  }, [copyLinkFallback, isNativeShell, targetUrl]);

  const label = copied ? "Link copied" : "Share the app";

  const onLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      void handleShare();
    },
    [handleShare]
  );

  return (
    <ListItem>
      <Link href="#share-app" onClick={onLinkClick} sx={{ textAlign: "left" }}>
        {label}
      </Link>
    </ListItem>
  );
}

import { ShareAppLink } from "@/components/ShareAppLink";
import { PLAY_STORE_URL, SHARE_TEXT, SHARE_TITLE } from "@/constants";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type TestWindow = Window & {
  ReactNativeWebView?: {
    postMessage(message: string): void;
  };
};

describe("ShareAppLink", () => {
  beforeEach(() => {
    delete (window as TestWindow).ReactNativeWebView;
  });

  it("uses the Web Share API when available", async () => {
    const user = userEvent.setup();
    const shareMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: shareMock,
    });

    render(<ShareAppLink />);
    await user.click(screen.getByRole("button", { name: /share the app/i }));

    expect(shareMock).toHaveBeenCalledWith({
      title: SHARE_TITLE,
      text: SHARE_TEXT,
      url: window.location.origin,
    });
  });

  it("falls back to clipboard when share is unavailable", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
    const clipboardMock = vi
      .spyOn(navigator.clipboard!, "writeText")
      .mockResolvedValue(undefined);

    render(<ShareAppLink />);
    await user.click(screen.getByRole("button", { name: /share the app/i }));

    expect(clipboardMock).toHaveBeenCalledWith(window.location.origin);
    expect(await screen.findByText(/Link copied/i)).toBeInTheDocument();
  });

  it("uses prompt fallback when clipboard is unavailable", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    render(<ShareAppLink />);
    await user.click(screen.getByRole("button", { name: /share the app/i }));

    expect(window.prompt).toHaveBeenCalledWith(
      "Share this link",
      window.location.origin
    );
  });

  it("sends a message to the native shell when present", async () => {
    const user = userEvent.setup();
    const postMessage = vi.fn();
    (window as TestWindow).ReactNativeWebView = {
      postMessage,
    };
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });

    render(<ShareAppLink />);
    await user.click(screen.getByRole("button", { name: /share the app/i }));

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        type: "share",
        payload: {
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: PLAY_STORE_URL,
        },
      })
    );
  });

  it("logs a warning when clipboard write fails", async () => {
    const user = userEvent.setup();
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error("denied")),
      },
    });
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(<ShareAppLink />);
    await user.click(screen.getByRole("button", { name: /share the app/i }));

    expect(warnSpy).toHaveBeenCalledWith(
      "Unable to copy share link",
      expect.any(Error)
    );
    expect(window.prompt).toHaveBeenCalled();

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
  });

  it("treats share abort errors as a no-op", async () => {
    const user = userEvent.setup();
    const abortError = new DOMException("aborted", "AbortError");
    const shareMock = vi.fn().mockRejectedValue(abortError);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: shareMock,
    });
    const clipboardSpy = vi.spyOn(navigator.clipboard!, "writeText");

    render(<ShareAppLink />);
    await user.click(screen.getByRole("button", { name: /share the app/i }));

    expect(shareMock).toHaveBeenCalled();
    expect(clipboardSpy).not.toHaveBeenCalled();
  });
});

import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import { render, screen, waitFor } from "@testing-library/react";

describe("ClientThemeProvider", () => {
  it("renders children after hydration", async () => {
    render(
      <ClientThemeProvider>
        <div>child node</div>
      </ClientThemeProvider>,
    );

    await waitFor(() =>
      expect(screen.getByText("child node")).toBeInTheDocument(),
    );
  });
});


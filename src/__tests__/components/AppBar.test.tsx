import { AppBar } from "@/components/AppBar";
import { resetCookwareStore } from "@test/cookwareStoreTestUtils";
import { render, screen } from "@testing-library/react";

describe("AppBar", () => {
  beforeEach(() => {
    resetCookwareStore();
  });

  it("renders primary actions", () => {
    render(<AppBar />);
    expect(
      screen.getByRole("button", { name: /add cookware/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /appreciate-this/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Saved your time/i)).toBeInTheDocument();
  });
});

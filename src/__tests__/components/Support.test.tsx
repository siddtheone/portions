import { Support } from "@/components/Support";
import { SUPPORT_LINKS } from "@/constants";
import { resetCookwareStore } from "@test/cookwareStoreTestUtils";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Support", () => {
  beforeEach(() => {
    resetCookwareStore();
  });

  it("opens dialog with share link first and other support links", async () => {
    const user = userEvent.setup();
    render(<Support />);

    await user.click(screen.getByRole("button", { name: /appreciate-this/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent("Share the app");

    SUPPORT_LINKS.forEach(({ name }) => {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});


import { AddCookware } from "@/components/AddCookware";
import { resetCookwareStore } from "@test/cookwareStoreTestUtils";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddCookware", () => {
  beforeEach(() => {
    resetCookwareStore();
  });

  it("opens the dialog and submits values", async () => {
    const user = userEvent.setup();
    const addNewCookware = vi.fn();
    resetCookwareStore({ addNewCookware });

    render(<AddCookware />);

    await user.click(screen.getByRole("button", { name: /add cookware/i }));
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await user.click(screen.getByRole("button", { name: /add cookware/i }));
    await user.type(screen.getByLabelText(/Cookware name/i), "Copper Pot");
    await user.type(screen.getByLabelText(/Cookware weight/i), "900");
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(addNewCookware).toHaveBeenCalledWith({
      name: "Copper Pot",
      weight: 900,
    });
  });
});


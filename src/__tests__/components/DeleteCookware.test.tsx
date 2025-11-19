import { DeleteCookware } from "@/components/DeleteCookware";
import { resetCookwareStore } from "@test/cookwareStoreTestUtils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DeleteCookware", () => {
  beforeEach(() => {
    resetCookwareStore();
  });

  it("confirms deletions via the store", async () => {
    const deleteCookware = vi.fn();
    resetCookwareStore({ deleteCookware });
    const user = userEvent.setup();

    render(<DeleteCookware id="cook-1" />);

    await user.click(screen.getByRole("button", { name: /delete-cookware/i }));
    await user.click(screen.getByRole("button", { name: /confirm/i }));

    expect(deleteCookware).toHaveBeenCalledWith("cook-1");
  });
});


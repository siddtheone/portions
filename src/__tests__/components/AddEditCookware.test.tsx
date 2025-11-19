import { AddEditCookware } from "@/components/AddEditCookware";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddEditCookware", () => {
  it("submits user provided values", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<AddEditCookware onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/Cookware name/i), "Steel Pot");
    await user.type(screen.getByLabelText(/Cookware weight/i), "1200");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Steel Pot",
      weight: 1200,
    });
  });

  it("applies default values when inputs are empty", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<AddEditCookware onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Container",
      weight: 0,
    });
  });
});

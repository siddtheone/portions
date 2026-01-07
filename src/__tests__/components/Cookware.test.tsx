import { Cookware } from "@/components/Cookware";
import { resetCookwareStore } from "@test/cookwareStoreTestUtils";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const cookware = {
  id: "cook-1",
  name: "Everyday Pot",
  weight: 500,
  weightWithMeal: 1500,
  servingCount: 2,
  expanded: true,
};

describe("Cookware", () => {
  beforeEach(() => {
    resetCookwareStore();
  });

  it("renders cookware metadata", () => {
    render(<Cookware cookware={cookware} />);
    expect(screen.getByText(/Everyday Pot/)).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "1" })).toBeInTheDocument();
  });

  it("propagates updates through the store", async () => {
    const user = userEvent.setup();
    const updateCookware = vi.fn();
    resetCookwareStore({ updateCookware });

    render(<Cookware cookware={cookware} />);

    await user.click(screen.getByText(/Everyday Pot/));
    expect(updateCookware).toHaveBeenCalledWith("cook-1", { expanded: false });

    await user.click(screen.getByLabelText("3"));
    expect(updateCookware).toHaveBeenCalledWith("cook-1", {
      servingCount: 3,
    });
  });

  it("updates weight with meal values via numeric input", async () => {
    const user = userEvent.setup();
    const updateCookware = vi.fn();
    resetCookwareStore({ updateCookware });

    render(<Cookware cookware={cookware} />);

    const weightInput = screen.getByLabelText(/Weight with meal/i);
    await user.clear(weightInput);
    await user.type(weightInput, "1800");
    expect(updateCookware).toHaveBeenCalledWith("cook-1", {
      weightWithMeal: 1800,
    });

    await user.clear(weightInput);
    expect(updateCookware).toHaveBeenCalledWith("cook-1", {
      weightWithMeal: 0,
    });
  });

  it("focuses the weight input when a cookware is expanded", async () => {
    const { rerender } = render(
      <Cookware cookware={{ ...cookware, expanded: false }} />
    );

    rerender(<Cookware cookware={{ ...cookware, expanded: true }} />);

    await waitFor(() =>
      expect(screen.getByLabelText(/Weight with meal/i)).toHaveFocus()
    );
  });
});


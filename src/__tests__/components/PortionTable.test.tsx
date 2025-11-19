import { PortionTable } from "@/components/PortionTable";
import { render, screen } from "@testing-library/react";

const baseCookware = {
  id: "cook-1",
  name: "Pot",
  weight: 500,
  weightWithMeal: 1500,
  servingCount: 2,
  expanded: true,
};

describe("PortionTable", () => {
  it("returns null when meal weight is not greater than tare weight", () => {
    render(
      <PortionTable
        cookware={{ ...baseCookware, weight: 500, weightWithMeal: 400 }}
      />,
    );
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("lists serving breakdown with precise values", () => {
    render(<PortionTable cookware={baseCookware} />);

    expect(
      screen.getByRole("table", { name: /Portion table for Pot/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // header + 2 servings
    expect(screen.getByText(/For 2 servings/)).toBeInTheDocument();
    expect(screen.getByText("1000.00")).toBeInTheDocument();
  });
});


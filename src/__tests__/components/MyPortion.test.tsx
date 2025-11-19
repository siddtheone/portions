import { MyPortion } from "@/components/MyPortion";
import { resetCookwareStore } from "@test/cookwareStoreTestUtils";
import { render, screen } from "@testing-library/react";

describe("MyPortion", () => {
  beforeEach(() => {
    resetCookwareStore();
  });

  it("renders empty state when no cookware", () => {
    render(<MyPortion />);
    expect(
      screen.getByText(/Start by adding cookwares/i),
    ).toBeInTheDocument();
  });

  it("renders cookware cards from the store", () => {
    resetCookwareStore({
      cookwares: [
        {
          id: "a",
          name: "Pot",
          weight: 400,
          weightWithMeal: 0,
          servingCount: 2,
          expanded: false,
        },
        {
          id: "b",
          name: "Pan",
          weight: 500,
          weightWithMeal: 0,
          servingCount: 3,
          expanded: false,
        },
      ],
    });

    render(<MyPortion />);
    expect(screen.getByText(/Pot/)).toBeInTheDocument();
    expect(screen.getByText(/Pan/)).toBeInTheDocument();
  });
});


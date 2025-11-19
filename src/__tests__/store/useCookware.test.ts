import { useCookware } from "@/store/useCookware";
import { resetCookwareStore } from "@test/cookwareStoreTestUtils";

describe("useCookware store", () => {
  beforeEach(() => {
    resetCookwareStore();
  });

  it("adds a new cookware with sane defaults", () => {
    const { addNewCookware } = useCookware.getState();
    addNewCookware({ name: "Steel Pot", weight: 1200 });

    const [first] = useCookware.getState().cookwares;
    expect(first).toMatchObject({
      name: "Steel Pot",
      weight: 1200,
      weightWithMeal: 0,
      servingCount: 1,
      expanded: false,
    });
    expect(typeof first.id).toBe("string");
  });

  it("updates cookware entries by id", () => {
    const initial = {
      id: "abc",
      name: "Pan",
      weight: 300,
      weightWithMeal: 0,
      servingCount: 2,
      expanded: false,
    };
    resetCookwareStore({ cookwares: [initial] });

    const { updateCookware } = useCookware.getState();
    updateCookware("abc", { servingCount: 4, expanded: true });

    expect(useCookware.getState().cookwares[0]).toMatchObject({
      servingCount: 4,
      expanded: true,
    });
  });

  it("deletes cookware entries", () => {
    const first = {
      id: "abc",
      name: "Pan",
      weight: 300,
      weightWithMeal: 0,
      servingCount: 2,
      expanded: false,
    };
    const second = { ...first, id: "def", name: "Cup" };
    resetCookwareStore({ cookwares: [first, second] });

    const { deleteCookware } = useCookware.getState();
    deleteCookware("abc");

    expect(useCookware.getState().cookwares).toHaveLength(1);
    expect(useCookware.getState().cookwares[0].id).toBe("def");
  });
});


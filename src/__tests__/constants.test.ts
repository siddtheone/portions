import {
  MAX_WEIGHT,
  MOCK_COOKWARES,
  PLAY_STORE_URL,
  SERVINGS,
  SHARE_TEXT,
  SHARE_TITLE,
  SUPPORT_LINKS,
} from "@/constants";

describe("constants", () => {
  it("exposes cookware defaults", () => {
    expect(SERVINGS).toContain(1);
    expect(MAX_WEIGHT).toBeGreaterThan(0);
    expect(MOCK_COOKWARES).toHaveLength(4);
  });

  it("provides support metadata", () => {
    expect(SUPPORT_LINKS.map((link) => link.name)).toEqual([
      "UPI",
      "Buy me a coffee",
    ]);
    expect(PLAY_STORE_URL).toMatch(/^https:\/\/play\.google\.com/);
    expect(SHARE_TITLE).toBe("The Portions");
    expect(SHARE_TEXT).toContain("Plan servings");
  });
});

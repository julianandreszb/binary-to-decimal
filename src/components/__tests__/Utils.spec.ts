import { describe, it, expect } from "vitest";
import { isBinary } from "../../Utils/Utils";

describe("Utils", () => {
  it("should validate if a string is a valid binary number", function () {
    expect(isBinary("101010")).toBe(true);
    expect(isBinary("201010")).toBe(false);
    expect(isBinary("Aa1010")).toBe(false);
    expect(isBinary("1111")).toBe(true);
    expect(isBinary("10,.10")).toBe(false);
    expect(isBinary(" 1010")).toBe(false);
  });
});

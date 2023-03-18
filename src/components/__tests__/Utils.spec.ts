import { describe, it, expect } from "vitest";
import { isBinary, binaryToDecimal, decimalToBinary } from "../../Utils/Utils";

describe("Utils", () => {
  it("should validate if a string is a valid binary number", function () {
    expect(isBinary("101010")).toBe(true);
    expect(isBinary("201010")).toBe(false);
    expect(isBinary("Aa1010")).toBe(false);
    expect(isBinary("1111")).toBe(true);
    expect(isBinary("10,.10")).toBe(false);
    expect(isBinary(" 1010")).toBe(false);
  });

  it("should convert a binary number to decimal", function () {
    expect(binaryToDecimal("101010")).toBe(42);
    expect(binaryToDecimal("1111")).toBe(15);
    expect(binaryToDecimal("1010")).toBe(10);
    expect(binaryToDecimal("11111100101111011101")).toBe(1035229);
  });

  it("should convert a decimal number to binary", function () {
    expect(decimalToBinary(42)).toBe("101010");
    expect(decimalToBinary(15)).toBe("1111");
    expect(decimalToBinary(10)).toBe("1010");
    expect(decimalToBinary(1035229)).toBe("11111100101111011101");
  });

  //TODO: generateRandomDecimal
});

import { describe, it, expect } from "vitest";
import { formatCurrency } from "../formatCurrency";

describe("formatCurrency", () => {
  it("should format integer values correctly", () => {
    expect(formatCurrency(10)).toBe("£10.00");
    expect(formatCurrency(0)).toBe("£0.00");
    expect(formatCurrency(999)).toBe("£999.00");
  });

  it("should format decimal values with one decimal place correctly", () => {
    expect(formatCurrency(10.5)).toBe("£10.50");
    expect(formatCurrency(0.5)).toBe("£0.50");
    expect(formatCurrency(99.9)).toBe("£99.90");
  });

  it("should format decimal values with two decimal places correctly", () => {
    expect(formatCurrency(10.55)).toBe("£10.55");
    expect(formatCurrency(0.01)).toBe("£0.01");
    expect(formatCurrency(99.99)).toBe("£99.99");
  });

  it("should round decimal values to two decimal places", () => {
    expect(formatCurrency(10.555)).toBe("£10.56"); // Rounds up
    expect(formatCurrency(10.554)).toBe("£10.55"); // Rounds down
    expect(formatCurrency(99.999)).toBe("£100.00"); // Rounds up to next integer
  });

  it("should handle negative values correctly", () => {
    expect(formatCurrency(-10.5)).toBe("£-10.50");
    expect(formatCurrency(-0.01)).toBe("£-0.01");
  });

  it("should handle very large values correctly", () => {
    expect(formatCurrency(1000000)).toBe("£1000000.00");
    expect(formatCurrency(9999999.99)).toBe("£9999999.99");
  });

  it("should handle very small decimal values correctly", () => {
    expect(formatCurrency(0.001)).toBe("£0.00");
    expect(formatCurrency(0.009)).toBe("£0.01");
  });
});

import { describe, it, expect } from "vitest";
import { getTotalCount } from "../getTotalCount";
import { CartItem } from "../../interfaces";

describe("getTotalCount", () => {
  it("should return 0 when the cart is empty", () => {
    const items: CartItem[] = [];
    expect(getTotalCount(items)).toBe(0);
  });

  it("should return the quantity of a single item", () => {
    const items: CartItem[] = [
      {
        sku: 1,
        name: "Test Product",
        description: "Test Description",
        price: 10.5,
        basketLimit: 5,
        quantity: 1,
      },
    ];
    expect(getTotalCount(items)).toBe(1);
  });

  it("should return the correct quantity for a single item with quantity > 1", () => {
    const items: CartItem[] = [
      {
        sku: 1,
        name: "Test Product",
        description: "Test Description",
        price: 10.5,
        basketLimit: 5,
        quantity: 3,
      },
    ];
    expect(getTotalCount(items)).toBe(3);
  });

  it("should sum the quantities of multiple items", () => {
    const items: CartItem[] = [
      {
        sku: 1,
        name: "Product 1",
        description: "Description 1",
        price: 10.5,
        basketLimit: 5,
        quantity: 2,
      },
      {
        sku: 2,
        name: "Product 2",
        description: "Description 2",
        price: 15.75,
        basketLimit: 3,
        quantity: 3,
      },
      {
        sku: 3,
        name: "Product 3",
        description: "Description 3",
        price: 5.25,
        basketLimit: 10,
        quantity: 1,
      },
    ];
    expect(getTotalCount(items)).toBe(6); // 2 + 3 + 1 = 6
  });

  it("should handle a large number of items and quantities", () => {
    const items: CartItem[] = Array(10)
      .fill(null)
      .map((_, index) => ({
        sku: index + 1,
        name: `Product ${index + 1}`,
        description: `Description ${index + 1}`,
        price: 10,
        basketLimit: 10,
        quantity: index + 1,
      }));
    // Sum of 1+2+3+4+5+6+7+8+9+10 = 55
    expect(getTotalCount(items)).toBe(55);
  });
});

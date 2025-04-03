import { describe, it, expect } from "vitest";
import { getTotalPrice } from "../getTotalPrice";
import { CartItem } from "../../interfaces";

describe("getTotalPrice", () => {
  it("should return 0 when the cart is empty", () => {
    const items: CartItem[] = [];
    expect(getTotalPrice(items)).toBe(0);
  });

  it("should return the price of a single item with quantity 1", () => {
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
    expect(getTotalPrice(items)).toBe(10.5);
  });

  it("should return the price multiplied by quantity for a single item", () => {
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
    expect(getTotalPrice(items)).toBe(31.5); // 10.50 * 3 = 31.50
  });

  it("should sum the prices of multiple items with different quantities", () => {
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
    ];
    expect(getTotalPrice(items)).toBe(68.25); // (10.50 * 2) + (15.75 * 3) = 21 + 47.25 = 68.25
  });

  it("should round to 2 decimal places", () => {
    const items: CartItem[] = [
      {
        sku: 1,
        name: "Product",
        description: "Description",
        price: 10.333,
        basketLimit: 5,
        quantity: 1,
      },
    ];
    expect(getTotalPrice(items)).toBe(10.33);
  });

  it("should handle very small decimal values properly", () => {
    const items: CartItem[] = [
      {
        sku: 1,
        name: "Product",
        description: "Description",
        price: 0.01,
        basketLimit: 5,
        quantity: 3,
      },
    ];
    expect(getTotalPrice(items)).toBe(0.03);
  });

  it("should handle very large values properly", () => {
    const items: CartItem[] = [
      {
        sku: 1,
        name: "Expensive Product",
        description: "Very expensive",
        price: 9999.99,
        basketLimit: 5,
        quantity: 2,
      },
    ];
    expect(getTotalPrice(items)).toBe(19999.98); // 9999.99 * 2 = 19999.98
  });
});

import { CartItem } from "../interfaces";

export const getTotalPrice = (items: CartItem[]): number => {
  return (
    Math.round(
      items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
    ) / 100
  );
};

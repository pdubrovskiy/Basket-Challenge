import { CartItem } from "../interfaces";

export const getTotalCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

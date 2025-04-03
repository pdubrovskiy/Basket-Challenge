import { RootState } from "../../store/store";
import { getTotalCount, getTotalPrice } from "./utils";
import { CartItem } from "./interfaces";

export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

export const selectCartStatus = (
  state: RootState
): "idle" | "loading" | "failed" => state.cart.status;

export const selectCartError = (state: RootState): string | null =>
  state.cart.error;

export const selectCartItemCount = (state: RootState): number =>
  getTotalCount(state.cart.items);

export const selectCartTotalPrice = (state: RootState): number =>
  getTotalPrice(state.cart.items);

export const selectItemById = (
  state: RootState,
  sku: number
): CartItem | undefined =>
  state.cart.items.find((item: CartItem) => item.sku === sku);

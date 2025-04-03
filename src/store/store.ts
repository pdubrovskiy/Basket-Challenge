import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { CartState } from "../features/cart/interfaces";

// Define the state structure for better TypeScript support
export interface RootState {
  cart: CartState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// This is for general use cases, but we also provide the more specific interface above
export type AppDispatch = typeof store.dispatch;

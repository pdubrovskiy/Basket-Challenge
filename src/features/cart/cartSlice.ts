import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorageConfig } from "../../config/localStorage";
import { CartState, CartItem, UpdateQuantityPayload } from "./interfaces";

const initialState: CartState = {
  items: localStorageConfig.getItem("cart")?.items || [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku
      );

      if (existingItem && existingItem.quantity >= action.payload.basketLimit) {
        return;
      }

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorageConfig.saveItem("cart", { items: state.items });
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.sku !== action.payload);
      localStorageConfig.saveItem("cart", { items: state.items });
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { sku, quantity } = action.payload;
      const item = state.items.find((item) => item.sku === sku);

      if (item && quantity > 0 && quantity <= item.basketLimit) {
        item.quantity = quantity;
        localStorageConfig.saveItem("cart", { items: state.items });
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorageConfig.removeItem("cart");
    },

    setCartError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },

    resetCartStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartError,
  resetCartStatus,
} = cartSlice.actions;

export default cartSlice.reducer;

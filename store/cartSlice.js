import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../utils/product";

const initialState = {
  items: [],
  products: PRODUCTS,
};
const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const { products, quantity } = action.payload;
      const existingItem = state.items.findIndex(
        (item) => item.products.id === products.id,
      );
      if (existingItem >= 0) {
        state.items[existingItem].quantity += quantity;
      } else {
        state.items.push({ products, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { productsId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.products.id === productsId,
      );
      if (existingItemIndex < 0) return;

      const existingItem = state.items[existingItemIndex];

      if (existingItem.quantity > quantity) {
        existingItem.quantity -= quantity;
      } else {
        state.items.splice(existingItemIndex, 1);
      }
    },
    filterProducts: (state, action) => {
      const searchTerms = String(action.payload ?? "").trim().toLowerCase();

      state.products = PRODUCTS.filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchTerms);
      });
    },
  },
});

export const { addToCart, removeFromCart, filterProducts } = cartSlice.actions;
export default cartSlice.reducer;

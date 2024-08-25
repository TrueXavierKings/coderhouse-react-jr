import React, { createContext, useReducer, useContext } from "react";

const TAX_RATE = parseFloat(import.meta.env.VITE_TAX_RATE) || 0;

const initialCartState = {
  items: [],
  cartItemsQuantity: 0,
  itemsTotalPrice: 0,
  tax: 0,
  cartTotalPrice: 0,
  email: "",
  taxRate: TAX_RATE,
};

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const { item, quantity } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedItems;
      let updatedCartItemsQuantity = state.cartItemsQuantity;
      let updatedItemsTotalPrice = state.itemsTotalPrice;

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          totalPrice: (existingItem.quantity + quantity) * existingItem.price,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        const newItem = {
          ...item,
          quantity: quantity,
          totalPrice: quantity * item.price,
        };
        updatedItems = [...state.items, newItem];
      }

      updatedCartItemsQuantity += quantity;

      updatedItemsTotalPrice += item.price * quantity;

      const tax = updatedItemsTotalPrice * state.taxRate;
      const updatedCartTotalPrice = updatedItemsTotalPrice + tax;

      return {
        ...state,
        items: updatedItems,
        cartItemsQuantity: updatedCartItemsQuantity,
        itemsTotalPrice: updatedItemsTotalPrice,
        tax: tax,
        cartTotalPrice: updatedCartTotalPrice,
      };
    case "REMOVE_ITEM":
      const idToRemove = action.payload;

      const itemsAfterRemoval = state.items.filter(item => item.id !== idToRemove);

      const cartItemsQuantityAfterRemoval = itemsAfterRemoval.reduce((total, item) => total + item.quantity, 0);
      const itemsTotalPriceAfterRemoval = itemsAfterRemoval.reduce((total, item) => total + item.totalPrice, 0);
      const taxAfterRemoval = itemsTotalPriceAfterRemoval * state.taxRate;
      const cartTotalPriceAfterRemoval = itemsTotalPriceAfterRemoval + taxAfterRemoval;

      return {
        ...state,
        items: itemsAfterRemoval,
        cartItemsQuantity: cartItemsQuantityAfterRemoval,
        itemsTotalPrice: itemsTotalPriceAfterRemoval,
        tax: taxAfterRemoval,
        cartTotalPrice: cartTotalPriceAfterRemoval,
      };
    case "RESET_CART":
      return initialCartState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

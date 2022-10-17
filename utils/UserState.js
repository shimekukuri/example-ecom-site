import { createContext, useReducer } from "react";
import { ACTIONS } from "./ACTIONS";

export const UserState = createContext();

const initalState = {
  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CART_ADD_ITEM: {
      const itemToAdd = action.payload;
      const existingItem = state.cart.cartItems.find(
        (product) => product.slug === itemToAdd.slug
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) => {
            return item.name === existingItem.name ? itemToAdd : item;
          })
        : [...state.cart.cartItems, itemToAdd];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default: {
      return state;
    }
  }
}

export function UserStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const value = { state, dispatch };
  return <UserState.Provider value={value}>{children}</UserState.Provider>;
}

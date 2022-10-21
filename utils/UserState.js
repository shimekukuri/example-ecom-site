import { createContext, useReducer } from "react";
import { ACTIONS } from "./ACTIONS";
import Cookies from "js-cookie";

export const UserState = createContext();

const initalState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {} },
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
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ACTIONS.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ACTIONS.CART_RESET: {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {}, paymentMethod: "" },
        },
      };
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

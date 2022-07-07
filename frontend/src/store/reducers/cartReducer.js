import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from '../actions/types';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEMS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case CART_REMOVE_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    default:
      return state;
  }
};

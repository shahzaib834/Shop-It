import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from './types';

export const addToCart =
  (id, name, price, stock, qty) => async (dispatch, getState) => {
    dispatch({
      type: CART_ADD_ITEMS,
      payload: {
        id,
        name,
        price,
        stock,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEMS,
      payload: id,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
};

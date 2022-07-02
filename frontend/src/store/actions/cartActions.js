import axios from 'axios';
import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from './types';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEMS,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
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

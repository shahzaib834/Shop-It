import axios from 'axios';

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from './types';

export const getProducts =
  (
    keyword = '',
    currentPage = 1,
    minPrice = 0,
    maxPrice = 1000,
    category,
    ratings
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `https://fast-sands-24063.herokuapp.com/api/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
      // price[lte]=${minPrice}&price[gte]=${maxPrice}   price filter for later
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

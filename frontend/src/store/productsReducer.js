import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    keyword = '',
    currentPage = 1,
    minPrice = 0,
    maxPrice = 1000,
    category,
    ratings = 0
  ) => {
    try {
      let link = `/api/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
      // price[lte]=${minPrice}&price[gte]=${maxPrice}   price filter for later

      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data.product;
    } catch (err) {
      return err.message;
    }
  }
);

const initialState = {
  products: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  productsCount: 0,
  resPerPage: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.productsCount = action.payload.count;
        state.resPerPage = action.payload.resPerPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

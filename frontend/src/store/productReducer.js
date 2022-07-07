import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  product: {},
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import {
  productReducer,
  productDetailsReducer,
} from './reducers/productReducers';

const store = configureStore({
  reducer: {
    products: productReducer,
    product: productDetailsReducer,
  },
});

export default store;

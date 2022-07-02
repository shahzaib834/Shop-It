import { configureStore } from '@reduxjs/toolkit';
import {
  productReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { authReducer } from './reducers/authReducer';
import { cartReducer } from './reducers/cartReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    product: productDetailsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;

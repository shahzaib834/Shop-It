import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import {
  productReducer,
  productDetailsReducer,
} from './reducers/productReducers';

import { authReducer } from './reducers/authReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    product: productDetailsReducer,
    auth: authReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import orderbookReducer from './features/orderbook/orderbookSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
    user: userReducer
  },
});



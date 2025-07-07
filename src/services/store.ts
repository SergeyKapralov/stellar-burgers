import { configureStore } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredientSlices';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import feedReducer from '../slices/feedSlice';
import userOrdersReducer from '../slices/orderStorySlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = {
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  feed: feedReducer,
  userOrders: userOrdersReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

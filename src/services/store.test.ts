import { rootReducer } from './store';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientSlices';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import feedReducer from '../slices/feedSlice';
import userOrdersReducer from '../slices/orderStorySlice';

describe('rootReducer', () => {
  it('должен правильно инициализировать начальное состояние', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      user: userReducer(undefined, { type: '@@INIT' }),
      order: orderReducer(undefined, { type: '@@INIT' }),
      feed: feedReducer(undefined, { type: '@@INIT' }),
      userOrders: userOrdersReducer(undefined, { type: '@@INIT' }),
    });
  });

  it('должен инициализировать корректное начальное состояние стора', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    expect(state.ingredients).toEqual(ingredientsReducer(undefined, { type: '@@INIT' }));
    expect(state.user).toEqual(userReducer(undefined, { type: '@@INIT' }));
    expect(state.order).toEqual(orderReducer(undefined, { type: '@@INIT' }));
    expect(state.feed).toEqual(feedReducer(undefined, { type: '@@INIT' }));
    expect(state.userOrders).toEqual(userOrdersReducer(undefined, { type: '@@INIT' }));
  });

  it('должен содержать все необходимые редьюсеры', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('userOrders');
  });
});

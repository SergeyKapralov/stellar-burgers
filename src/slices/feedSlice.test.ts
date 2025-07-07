import reducer, { fetchFeedData } from './feedSlice';
import { TOrder } from '@utils-types';

describe('Редьюсер feedSlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    status: 'idle' as 'idle' | 'loading' | 'failed',
    error: undefined,
  };

  it('должен возвращать начальное состояние по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('должен установить статус загрузки при fetchFeedData.pending', () => {
    const action = { type: fetchFeedData.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('должен сохранить данные ленты и сбросить статус при fetchFeedData.fulfilled', () => {
    const fakeOrders: TOrder[] = [
      {
    "number": 83688,
    "_id": "6869eeb55a54df001b6dc0d9",
    "status": "done",
    "name": "Краторный бургер",
    "createdAt": "2025-07-06T03:34:13.495Z",
    "updatedAt": "2025-07-06T03:34:14.242Z",
    "ingredients": [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0942",
      "643d69a5c3f7b9001cfa093c"
    ]
  },
    ];

    const action = {
      type: fetchFeedData.fulfilled.type,
      payload: {
        orders: fakeOrders,
        total: 1000,
        totalToday: 100,
      },
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      orders: fakeOrders,
      total: 1000,
      totalToday: 100,
      status: 'idle',
      error: undefined,
    });
  });

  it('должен установить статус ошибки при fetchFeedData.rejected', () => {
    const action = {
      type: fetchFeedData.rejected.type,
      error: { message: 'Ошибка при загрузке' },
    };

    const state = reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Ошибка при загрузке');
  });
});

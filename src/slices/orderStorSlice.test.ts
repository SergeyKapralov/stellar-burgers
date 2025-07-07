import reducer, { fetchUserOrders } from './orderStorySlice';
import { TOrder } from '@utils-types';

describe('Редьюсер orderStorySlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    loading: false,
    error: null as string | null,
  };

  it('должен возвращать начальное состояние по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен устанавливать loading=true при вызове fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      orders: [],
      loading: true,
      error: null,
    });
  });

  it('должен записывать полученные заказы и отключать loading при fetchUserOrders.fulfilled', () => {
    const fakeOrders: TOrder[] = [
      {
    _id: '1234',
    status: 'done',
    name: 'first',
    createdAt: '2025',
    updatedAt: '2026',
    number: 13,
    ingredients: []} as TOrder,
       {
    _id: '5678',
    status: 'done',
    name: 'second',
    createdAt: '2025',
    updatedAt: '2026',
    number: 23,
    ingredients: []} as TOrder,
    ];
    const action = { type: fetchUserOrders.fulfilled.type, payload: fakeOrders };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      orders: fakeOrders,
      loading: false,
      error: null,
    });
  });

  it('должен сохранять ошибку и отключать loading при fetchUserOrders.rejected', () => {
    const action = { type: fetchUserOrders.rejected.type, payload: 'Ошибка загрузки заказов' };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      orders: [],
      loading: false,
      error: 'Ошибка загрузки заказов',
    });
  });
});

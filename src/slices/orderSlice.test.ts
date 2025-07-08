import reducer, {
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor,
  moveIngredient,
  orderBurger
} from './orderSlice';
import { TConstructorIngredient, TOrder } from '@utils-types';

describe('Редьюсер orderSlice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    orderRequest: false,
    orderModalData: null,
    orderError: null
  };

  const sampleIngredient1: TConstructorIngredient = {
    id: '1',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const sampleIngredient2: TConstructorIngredient = {
    id: '2',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const sampleIngredient3: TConstructorIngredient = {
    id: '3',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  it('должен возвращать начальное состояние по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен обрабатывать addIngredient и добавлять ингредиент', () => {
    const nextState = reducer(initialState, addIngredient(sampleIngredient1));
    expect(nextState.ingredients).toEqual([sampleIngredient1]);
  });

  it('должен обрабатывать removeIngredient и удалять ингредиент по id', () => {
    const prevState = {
      ...initialState,
      ingredients: [sampleIngredient1, sampleIngredient2]
    };
    const nextState = reducer(prevState, removeIngredient('1'));
    expect(nextState.ingredients).toEqual([sampleIngredient2]);
  });

  it('должен обрабатывать setBun и устанавливать булку', () => {
    const nextState = reducer(initialState, setBun(sampleIngredient1));
    expect(nextState.bun).toEqual(sampleIngredient1);
  });

  it('должен обрабатывать clearConstructor и сбрасывать ингредиенты и булку', () => {
    const prevState = {
      ...initialState,
      bun: sampleIngredient1,
      ingredients: [sampleIngredient1]
    };
    const nextState = reducer(prevState, clearConstructor());
    expect(nextState.bun).toBeNull();
    expect(nextState.ingredients).toEqual([]);
  });

  it('должен обрабатывать moveIngredient и перемещать ингредиенты', () => {
    const prevState = {
      ...initialState,
      ingredients: [sampleIngredient2, sampleIngredient3]
    };
    const nextState = reducer(
      prevState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(nextState.ingredients).toEqual([
      sampleIngredient3,
      sampleIngredient2
    ]);
  });

  it('должен обрабатывать orderBurger.pending и устанавливать флаг загрузки', () => {
    const action = { type: orderBurger.pending.type };
    const nextState = reducer(initialState, action);
    expect(nextState.orderRequest).toBe(true);
    expect(nextState.orderError).toBeNull();
  });

  it('должен обрабатывать orderBurger.fulfilled и сохранять данные заказа', () => {
    const mockOrder: TOrder = {
      number: 83688,
      _id: '6869eeb55a54df001b6dc0d9',
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2025-07-06T03:34:13.495Z',
      updatedAt: '2025-07-06T03:34:14.242Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ]
    };
    const action = { type: orderBurger.fulfilled.type, payload: mockOrder };
    const nextState = reducer(initialState, action);
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orderModalData).toEqual(mockOrder);
  });

  it('должен обрабатывать orderBurger.rejected и сохранять ошибку', () => {
    const action = {
      type: orderBurger.rejected.type,
      payload: 'Ошибка заказа'
    };
    const nextState = reducer(initialState, action);
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orderError).toBe('Ошибка заказа');
  });
});

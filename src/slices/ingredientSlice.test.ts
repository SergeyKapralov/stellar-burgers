import reducer, { fetchIngredients } from './ingredientSlices';
import { TIngredient } from '@utils-types';

describe('Редьюсер ingredientsSlice', () => {
  const initialState = {
    items: [] as TIngredient[],
    isLoading: false,
    error: null as string | null
  };

  it('должен возвращать начальное состояние по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('должен установить флаг загрузки при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  it('должен сохранить ингредиенты и отключить загрузку при fetchIngredients.fulfilled', () => {
    const fakeIngredients: TIngredient[] = [
      {
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      } as TIngredient,
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      } as TIngredient
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: fakeIngredients
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: fakeIngredients,
      isLoading: false,
      error: null
    });
  });

  it('должен записать ошибку и отключить загрузку при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки ингредиентов'
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});

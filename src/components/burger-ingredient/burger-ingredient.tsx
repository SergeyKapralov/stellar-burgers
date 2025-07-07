import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addIngredient, setBun } from '../../slices/orderSlice';
import { useSelector } from '../../services/store';
import store from '../../services/store';
import { v4 as uuidv4 } from 'uuid';
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const orderIngredients = useSelector((state) => state.order.ingredients);

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(
          setBun({
            ...ingredient,
            id: uuidv4()
          })
        );
      } else {
        dispatch(
          addIngredient({
            ...ingredient,
            id: uuidv4()
          })
        );
      }
      console.log(store.getState().order);
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

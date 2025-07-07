import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrderRequest,
  selectOrderModalData,
  selectBunItems,
  selectIngredients as selectConstructorIngredients
} from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import {
  orderBurger,
  clearOrderModal,
  clearConstructor
} from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const constructorItems = {
    bun: useSelector(selectBunItems),
    ingredients: useSelector(selectConstructorIngredients)
  };
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthChecked) {
      return;
    }
    if (isAuthenticated) {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(ingredientIds));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModal());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  selectUserOrders
} from '../../slices/orderStorySlice';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

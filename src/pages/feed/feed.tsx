import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import {
  selectFeedOrders,
  selectFeedStatus,
  fetchFeedData
} from '../../slices/feedSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const status = useSelector(selectFeedStatus);
  const dispatch = useDispatch();

  if (status === 'loading') {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeedData());
      }}
    />
  );
};

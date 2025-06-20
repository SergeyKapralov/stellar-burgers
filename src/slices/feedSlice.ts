import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../utils/burger-api';
import { RootState } from '../services/store';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'failed';
  error?: string;
}

const initialFeedState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle'
};

export const fetchFeedData = createAsyncThunk(
  'feed/fetchFeedData',
  async (_, thunkAPI) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialFeedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchFeedData.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.status = 'idle';
        }
      )
      .addCase(fetchFeedData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

export const selectFeedStatus = (state: RootState) => state.feed.status;

export default feedSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../services/store';
export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchUserOrders', async (_, thunkAPI) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || 'Failed to load user orders'
    );
  }
});

interface IUserOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: IUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error';
      });
  }
});

export default userOrdersSlice.reducer;

// Селектор для компонента
export const selectUserOrders = (state: RootState) => state.userOrders.orders;

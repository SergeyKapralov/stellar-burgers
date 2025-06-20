import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../utils/cookie';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TAuthResponse
} from '../utils/burger-api';

import { TUser } from '../utils/types';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registerUserError: string | null;
  registerUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  registerUserRequest: false
};

// -----------------------
// Логин
// -----------------------
export const loginUser = createAsyncThunk<
  TAuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>('user/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(credentials);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (err) {
    return rejectWithValue('Login error');
  }
});

// -----------------------
// Регистрация
// -----------------------
export const registerUser = createAsyncThunk<
  TAuthResponse,
  { email: string; password: string; name: string },
  { rejectValue: string }
>('user/registerUser', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (err) {
    return rejectWithValue('Registration error');
  }
});

// -----------------------
// Получение пользователя
// -----------------------
export const getUser = createAsyncThunk<
  { user: TUser },
  void,
  { rejectValue: string }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const res = await getUserApi();
    return res;
  } catch (err) {
    return rejectWithValue('Get user error');
  }
});

// -----------------------
// Обновление пользователя
// -----------------------
export const updateUser = createAsyncThunk<
  { user: TUser },
  Partial<{ name: string; email: string; password: string }>,
  { rejectValue: string }
>('user/updateUser', async (userData, { rejectWithValue }) => {
  try {
    return await updateUserApi(userData);
  } catch (err) {
    return rejectWithValue('Update user error');
  }
});

// -----------------------
// Логаут
// -----------------------
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; max-age=0';
    } catch (err) {
      return rejectWithValue('Logout error');
    }
  }
);

// -----------------------
// Слайс
// -----------------------
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- loginUser ---
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload || 'Login failed';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      // --- registerUser ---
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserRequest = false;
        state.registerUserError = action.payload || 'Registration failed';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.registerUserRequest = false;
        state.isAuthenticated = true;
      })

      // --- getUser ---
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })

      // --- updateUser ---
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })

      // --- logoutUser ---
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  }
});

// -----------------------
export default userSlice.reducer;

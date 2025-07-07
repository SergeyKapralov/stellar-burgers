import reducer, {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logoutUser
} from './userSlice'; 

describe('Редьюсер userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    data: null,
    loginUserError: null,
    loginUserRequest: false,
    registerUserError: null,
    registerUserRequest: false
  };

  it('должен возвращать начальное состояние по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('Асинхронный экшен loginUser', () => {
    it('должен устанавливать состояние ожидания при вызове loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(undefined, action);
      expect(state.loginUserRequest).toBe(true);
      expect(state.loginUserError).toBeNull();
    });

    it('должен обновлять состояние при успешном выполнении loginUser.fulfilled', () => {
      const mockUser = {
        name: 'Тестовый пользователь',
        email: 'test@example.com'
      };
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser, accessToken: 'token', refreshToken: 'token' }
      };
      const state = reducer(undefined, action);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.data).toEqual(mockUser);
    });

    it('должен устанавливать ошибку при неудаче loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: 'Ошибка входа'
      };
      const state = reducer(undefined, action);
      expect(state.loginUserRequest).toBe(false);
      expect(state.loginUserError).toBe('Ошибка входа');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Асинхронный экшен registerUser', () => {
    it('должен устанавливать состояние ожидания при вызове registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(undefined, action);
      expect(state.registerUserRequest).toBe(true);
      expect(state.registerUserError).toBeNull();
    });

    it('должен обновлять состояние при успешной регистрации registerUser.fulfilled', () => {
      const mockUser = {
        name: 'Тестовый пользователь',
        email: 'test@example.com'
      };
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser, accessToken: 'token', refreshToken: 'token' }
      };
      const state = reducer(undefined, action);
      expect(state.registerUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.data).toEqual(mockUser);
    });

    it('должен устанавливать ошибку при неудаче registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        payload: 'Ошибка регистрации'
      };
      const state = reducer(undefined, action);
      expect(state.registerUserRequest).toBe(false);
      expect(state.registerUserError).toBe('Ошибка регистрации');
    });
  });

  describe('Асинхронный экшен getUser', () => {
    it('должен обновлять состояние при успешном получении пользователя getUser.fulfilled', () => {
      const mockUser = {
        name: 'Тестовый пользователь',
        email: 'test@example.com'
      };
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(undefined, action);
      expect(state.data).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен сбрасывать данные и аутентификацию при ошибке getUser.rejected', () => {
      const action = { type: getUser.rejected.type };
      const state = reducer(undefined, action);
      expect(state.data).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Асинхронный экшен updateUser', () => {
    it('должен обновлять данные пользователя при updateUser.fulfilled', () => {
      const initial = {
        ...initialState,
        data: { name: 'Старое имя', email: 'old@example.com' }
      };
      const updatedUser = { name: 'Новое имя', email: 'new@example.com' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const state = reducer(initial, action);
      expect(state.data).toEqual(updatedUser);
    });
  });

  describe('Асинхронный экшен logoutUser', () => {
    it('должен очищать состояние при успешном выходе logoutUser.fulfilled', () => {
      const loggedInState = {
        ...initialState,
        data: { name: 'Пользователь', email: 'user@example.com' },
        isAuthenticated: true,
        isAuthChecked: false
      };
      const action = { type: logoutUser.fulfilled.type };
      const state = reducer(loggedInState, action);
      expect(state.data).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });
});

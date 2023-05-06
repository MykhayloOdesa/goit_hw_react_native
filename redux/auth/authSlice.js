import { createSlice } from '@reduxjs/toolkit';
import { authSignUpUser } from './authOperations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userID: null,
    login: null,
    isAuth: false,
    error: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authSignUpUser.pending, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = false;
      })
      .addCase(authSignUpUser.fulfilled, (state, action) => {
        return {
          ...state,
          userID: action.payload.userID,
          login: action.payload.login,
          isAuth: true,
        };
      })
      .addCase(authSignUpUser.rejected, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = true;
      });
  },
});

export const authReducer = authSlice.reducer;

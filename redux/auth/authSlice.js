import { createSlice } from '@reduxjs/toolkit';
import {
  authSignUpUser,
  authLogInUser,
  authSignOutUser,
  authOnStateChanged,
} from './authOperations';

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
      })
      .addCase(authLogInUser.pending, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = false;
      })
      .addCase(authLogInUser.fulfilled, (state, action) => {
        return {
          ...state,
          userID: action.payload.userID,
          login: action.payload.login,
          isAuth: true,
        };
      })
      .addCase(authLogInUser.rejected, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = true;
      })
      .addCase(authSignOutUser.pending, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = false;
      })
      .addCase(authSignOutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(authSignOutUser.rejected, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = true;
      })
      .addCase(authOnStateChanged.pending, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = false;
      })
      .addCase(authOnStateChanged.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(authOnStateChanged.rejected, state => {
        state.userID = null;
        state.login = null;
        state.isAuth = false;
        state.error = true;
      });
  },
});

export const authReducer = authSlice.reducer;

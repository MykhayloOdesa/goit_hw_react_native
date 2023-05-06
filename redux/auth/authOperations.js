import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../../firebase/config';

export const authSignUpUser = createAsyncThunk(
  'auth/signUp',
  async ({ login, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, { displayName: login });
        console.log('user', user);

        const updateSuccessful = auth.currentUser;

        await updateProfile(updateSuccessful, {
          login: updateSuccessful.displayName,
          userID: updateSuccessful.uid,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLogInUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return credentials.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk();

export const authOnStateChanged = createAsyncThunk(
  'auth/update',
  async (setUser, thunkAPI) => {
    try {
      onAuthStateChanged(user => setUser(user));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  refreshToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        gender: string;
        image: string;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      const { id, username, email, firstName, lastName, gender, image } = action.payload;
      const userObject = { id, username, email, firstName, lastName, gender, image }
      state.user = userObject;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
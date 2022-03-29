import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, Auth, SignUpItem, SignInItem } from '../types/Auth';

const initialState: AuthState = {
  id: undefined,
  username: undefined,
  error: undefined,
  hasTokenError: false,
};

export const signUp = createAsyncThunk<Auth, SignUpItem>(
  'sign_up',
  async (signUpItem: SignUpItem): Promise<Auth> => {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(signUpItem);

    const res = await fetch('http://localhost:4000/sign_up', {
      method,
      headers,
      body,
    });

    switch (res.status) {
      case 201:
        const auth = (await res.json()) as Auth;
        // remove tokens to prevent auto login by tokens of another user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return auth;
      case 422:
        throw new Error('invalid inputs');
      default:
        throw new Error('unexpected error');
    }
  }
);

export const signIn = createAsyncThunk<Auth, SignInItem>(
  'sign_in',
  async (signInItem: SignInItem): Promise<Auth> => {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(signInItem);

    const res = await fetch('http://localhost:4000/sign_in', {
      method,
      headers,
      body,
    });

    switch (res.status) {
      case 200:
        const auth = (await res.json()) as Auth;
        localStorage.setItem('accessToken', auth.accessToken as string);
        localStorage.setItem('refreshToken', auth.refreshToken as string);
        return auth;
      case 401:
        throw new Error('cannot authorized');
      case 422:
        throw new Error('invalid inputs');
      default:
        throw new Error('unexpected error');
    }
  }
);

export const authUser = createAsyncThunk<Auth>(
  'auth_user',
  async (): Promise<Auth> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return {};
    }

    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await fetch('http://localhost:4000/auth_user', {
      method,
      headers,
    });

    switch (res.status) {
      case 200:
        const auth = (await res.json()) as Auth;
        return auth;
      default:
        throw new Error('auth user error');
    }
  }
);

export const refresh = createAsyncThunk<Auth>(
  'refresh',
  async (): Promise<Auth> => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return {};
    }

    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ refreshToken: refreshToken });

    const res = await fetch('http://localhost:4000/refresh', {
      method,
      headers,
      body,
    });

    switch (res.status) {
      case 201:
        const auth = (await res.json()) as Auth;
        const { accessToken, refreshToken } = auth;
        localStorage.setItem('accessToken', accessToken as string);
        localStorage.setItem('refreshToken', refreshToken as string);
        return auth;
      default:
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw new Error('auth user error');
    }
  }
);

export const signOut = createAsyncThunk<Auth>(
  'sign_out',
  async (): Promise<Auth> => {
    const method = 'DELETE';
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await fetch('http://localhost:4000/signout', {
      method,
      headers,
    });

    switch (res.status) {
      case 200:
        const auth = (await res.json()) as Auth;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return auth;
      default:
        throw new Error('unexpected error');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.error = undefined;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.error = undefined;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(signOut.fulfilled, (state, _action) => {
      state.id = undefined;
      state.username = undefined;
      state.error = undefined;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.error = undefined;
      state.hasTokenError = false;
    });
    builder.addCase(authUser.rejected, (state, _action) => {
      state.error = undefined;
      state.hasTokenError = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.error = undefined;
      state.hasTokenError = false;
    });
    builder.addCase(refresh.rejected, (state, _action) => {
      state.error = undefined;
      state.hasTokenError = false;
    });
  },
});

import type { SerializedError } from '@reduxjs/toolkit';

export type AuthState = {
  readonly id?: number;
  readonly username?: string;
  readonly error?: SerializedError;
  readonly hasTokenError?: boolean;
};

export type Auth = {
  readonly id?: number;
  readonly username?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly error?: SerializedError;
};

export type SignInItem = {
  password: string;
  email: string;
};

export type SignUpItem = {
  password: string;
  email: string;
  username: string;
};

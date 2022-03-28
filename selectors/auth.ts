import { createSelector } from 'reselect';
import { RootState } from '../store';

// auth情報を取得するSelector
export const authSelector = (state: RootState) => state.auth;

export const idSelector = createSelector(authSelector, (auth) => {
  return auth.id;
});

export const userNameSelector = createSelector(authSelector, (auth) => {
  return auth.username;
});

export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error;
});

export const hasTokenErrorSelector = createSelector(authSelector, (auth) => {
  return auth.hasTokenError;
});
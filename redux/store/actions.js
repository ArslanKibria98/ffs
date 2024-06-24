import authAction from './auth/actions';
import { loadingAction } from './loading';
import { themeAction } from './theme';
import toastifyAction from './toastify/actions';

export const rootActions = {
  authStore: authAction,
  toastifyStore: toastifyAction,
  loadingStore: loadingAction,
  themeStore: themeAction,
};

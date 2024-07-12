import authAction from './auth/actions';
import { loadingAction } from './loading';
import toastifyAction from './toastify/actions';
import langAction from './language/actions';
import formAction from './form/actions';

export const rootActions = {
  authStore: authAction,
  langStore: langAction,
  formStore: formAction,

  toastifyStore: toastifyAction,
  loadingStore: loadingAction,
};

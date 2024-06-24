import { combineReducers } from 'redux';
import { authReducer } from './auth';
import loadingReducer from './loading';
import { themeSlice } from './theme';
import { toastifyReducer } from './toastify/reducers';

const rootReducer = combineReducers({
  authStore: authReducer,
  toastifyStore: toastifyReducer,
  loadingStore: loadingReducer,
  themeStore: themeSlice.reducer,
});
export default rootReducer;

import { combineReducers } from 'redux';
import { authReducer } from './auth';
import loadingReducer from './loading';
import { toastifyReducer } from './toastify/reducers';
import languageReducer from './language/reducers';
import { formReducer } from './form';


const rootReducer = combineReducers({
  authStore: authReducer,
  formStore: formReducer,
  language: languageReducer,

  toastifyStore: toastifyReducer,
  loadingStore: loadingReducer,
});
export default rootReducer;

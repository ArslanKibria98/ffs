import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit';

// const testMiddleware = () => (dispatch) => (action) => {
//   return dispatch(action);
// };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

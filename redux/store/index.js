import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

const testMiddleware = () => (dispatch) => (action) => {
  return dispatch(action);
};

// export const store = configureStore(
//   rootReducer,
//   // composeWithDevTools(applyMiddleware(testMiddleware)),
// );
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

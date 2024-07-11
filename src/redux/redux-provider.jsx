import { Provider } from 'react-redux'
// import { store, storeUnpresisted as persistor } from './store'
import { store, persistor } from './store'
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'

export default function ReduxProvider({ children }) {
  persistStore(store);
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
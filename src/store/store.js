import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import tokenReducer from './tokenSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['code'],
}

const persistedReducer = persistReducer(persistConfig, tokenReducer)

const store = configureStore({
  reducer: {
    token: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export const persistor = persistStore(store)
export default store

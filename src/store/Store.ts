import { configureStore } from '@reduxjs/toolkit'
import reducer from './GameSettings/GameSettings.slice'
export const Store = configureStore({
  reducer: {
    gameSetting: reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof Store.getState>
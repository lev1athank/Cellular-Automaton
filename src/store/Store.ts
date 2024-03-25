import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gameSettings from './GameSettings/GameSettings.slice'



export const Store = configureStore({
  reducer: gameSettings,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof Store.getState>
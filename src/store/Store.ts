import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gameSettings from './GameSettings/GameSettings.slice' 
import printsGame from './Prints/Prints.slice' 

const reducerCombine = combineReducers({
  gameSetting: gameSetting,
  printsGame: prints
})

export const Store = configureStore({
  reducer: reducerCombine,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof Store.getState>
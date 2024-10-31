import { configureStore } from '@reduxjs/toolkit'
import rikwestReducer from './Slices'

export const store = configureStore({
  reducer: {
    rikwest: rikwestReducer,
  },
})
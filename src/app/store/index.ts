import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import authReducer from './authSlice'
import notificationReducer from './notificationSlice'
import loadingReducer from './loadingSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    notification: notificationReducer,
    loading: loadingReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

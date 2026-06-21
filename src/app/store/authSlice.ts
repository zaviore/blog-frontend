import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isInitialized: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isInitialized: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.isInitialized = true
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.isInitialized = true
    },
    initializeAuth: (state, action: PayloadAction<User | null>) => {
      state.isAuthenticated = !!action.payload
      state.user = action.payload
      state.isInitialized = true
    }
  }
})

export const { initializeAuth, login, logout } = authSlice.actions
export default authSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingState {
  globalLoading: boolean
  loadingStates: Record<string, boolean>
}

const initialState: LoadingState = {
  globalLoading: false,
  loadingStates: {}
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload
    },
    setLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      state.loadingStates[action.payload.key] = action.payload.loading
    }
  }
})

export const { setGlobalLoading, setLoading } = loadingSlice.actions
export default loadingSlice.reducer

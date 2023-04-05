import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  code: '',
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setCode: (state, action) => {
      state.code = action.payload
    },
  },
})

export const { setToken, setCode } = tokenSlice.actions

export default tokenSlice.reducer

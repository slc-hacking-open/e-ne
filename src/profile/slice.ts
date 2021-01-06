import { createSlice } from '@reduxjs/toolkit'
import { User } from '../services/models'
import { getProfile } from './asyncActions'

export interface ProfileState {
  user: User
  isLoading: boolean
}

export const initialState: ProfileState = {
  user: { imageurl: '', name: '', profile: '', userid: '', department: '' },
  isLoading: false,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.user = initialState.user
      state.isLoading = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoading = false
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default profileSlice.reducer

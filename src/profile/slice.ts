import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../services/models'
import { getProfile } from './asyncActions'

export interface ProfileState {
  user: User
  isLoading: boolean
}

export const initialState: ProfileState = {
  user: {
    imageurl: '',
    name: '',
    profile: '',
    userid: '',
    department: '',
    enecoin: 0,
    glicocoin: 0,
  },
  isLoading: false,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reduceEneCoin: (state, action: PayloadAction<string>) => {
      state.user.enecoin -= Number(action.payload)
    },
  },
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

export const { reduceEneCoin } = profileSlice.actions

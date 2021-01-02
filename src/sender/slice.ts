import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../services/models'
import { getUsers } from './asyncActions'

export interface SenderState {
  contents: string
  to: string
  coin: string
  users: User[]
}

export const initialState: SenderState = {
  contents: '',
  to: '',
  coin: '',
  users: [],
}

const senderSlice = createSlice({
  name: 'sender',
  initialState,
  reducers: {
    changeContents: (state, action: PayloadAction<string>) => {
      state.contents = action.payload
    },
    changeTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload
    },
    changeCoin: (state, action: PayloadAction<string>) => {
      state.coin = action.payload
    },
    clear: (state) => {
      state.contents = ''
      state.to = ''
      state.coin = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.users = []
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
    builder.addCase(getUsers.rejected, (state) => {
      state.users = []
    })
  },
})

export const {
  changeContents,
  changeTo,
  changeCoin,
  clear,
} = senderSlice.actions

export default senderSlice.reducer

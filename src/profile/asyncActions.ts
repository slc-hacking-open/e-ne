import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../services/models'
import { getUserProfile } from '../services/users'

interface GetProfileParam {
  email: string
}

interface GetProfileResult {
  user: User
}

export const getProfile = createAsyncThunk<GetProfileResult, GetProfileParam>(
  'profile/getProfile',
  async (pram) => {
    const user = await getUserProfile(pram.email)

    return { user }
  }
)

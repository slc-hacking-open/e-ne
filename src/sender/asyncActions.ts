import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserList } from '../services/users'
import { User } from '../services/models'

export const getUsers = createAsyncThunk<User[]>(
  'sender/getUsers',
  async () => {
    const result: User[] = await getUserList()

    return result
  }
)

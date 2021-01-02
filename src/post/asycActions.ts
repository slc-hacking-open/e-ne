import { createAsyncThunk } from '@reduxjs/toolkit'
import { pushEmpathy } from '../services/posts'

interface pushEmpathyParam {
  userId: string
  postId: string
}

export const empathy = createAsyncThunk<boolean, pushEmpathyParam>(
  'post/empathy',
  async (pram) => {
    const result = await pushEmpathy(pram.userId, pram.postId)

    return result
  }
)

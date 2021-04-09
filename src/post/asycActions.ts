import { createAsyncThunk } from '@reduxjs/toolkit'
import { pushEmpathy } from '../services/posts'

interface pushEmpathyParam {
  postId: string
  userId: string
}

export const empathy = createAsyncThunk<boolean, pushEmpathyParam>(
  'post/empathy',
  async (pram) => {
    const result = await pushEmpathy(pram.postId, pram.userId)

    return result
  }
)

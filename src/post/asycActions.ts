import { createAsyncThunk } from '@reduxjs/toolkit'
import { addEmpathy, removeEmpathy } from '../services/posts'

interface pushEmpathyParam {
  postId: string
  userId: string
}

export const empathyAdd = createAsyncThunk<boolean, pushEmpathyParam>(
  'post/empathyAdd',
  async (pram) => {
    const result = await addEmpathy(pram.postId, pram.userId)

    return result
  }
)

export const empathyRemove = createAsyncThunk<boolean, pushEmpathyParam>(
  'post/empathyRemove',
  async (pram) => {
    const result = await removeEmpathy(pram.postId, pram.userId)

    return result
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTimeline,
  postPost,
  addEmpathy,
  removeEmpathy,
} from '../services/posts'
import { Timeline, Post } from '../services/models'

interface GetPostsParam {
  userid: string
  senderId?: string
  receiverId?: string
}
export const getPosts = createAsyncThunk<Timeline, GetPostsParam>(
  'posts/getPosts',
  async (pram) => {
    const result = await getTimeline(
      pram.userid,
      pram.senderId || '',
      pram.receiverId || ''
    )

    return result
  }
)

interface PostEneParam {
  senderId: string
  receiverId: string
  contents: string
  coin: string
}
export const sendEne = createAsyncThunk<Post, PostEneParam>(
  'posts/sendEne',
  async (pram) => {
    const result = await postPost(
      pram.senderId,
      pram.receiverId,
      pram.contents,
      pram.coin
    )

    return result
  }
)

interface pushEmpathyParam {
  postId: string
  userId: string
}

export const empathyAdd = createAsyncThunk<Post, pushEmpathyParam>(
  'post/empathyAdd',
  async (pram) => {
    const result = await addEmpathy(pram.postId, pram.userId)

    return result
  }
)

export const empathyRemove = createAsyncThunk<Post, pushEmpathyParam>(
  'post/empathyRemove',
  async (pram) => {
    const result = await removeEmpathy(pram.postId, pram.userId)

    return result
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTimeline, postPost } from '../services/posts'
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

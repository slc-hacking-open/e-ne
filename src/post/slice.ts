import { createSlice } from '@reduxjs/toolkit'
import { PostProps } from '../components/post'
import { empathy } from './asycActions'

export interface PostState {
  noStateNow: number
  posts: Array<PostProps>
}

export const initialState: PostState = {
  noStateNow: 0,
  posts: [],
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 共感
    // note: 共感ボタン押した時にローディングやエラーメッセージ出すのは
    // UX悪い気がするので、一旦succeedアクションしか作ってない
    // TODO: yoshikoshi 共感ボタン押下時のエラー処理方式の検討
    builder.addCase(empathy.fulfilled, () => {})
  },
})

export default postSlice.reducer

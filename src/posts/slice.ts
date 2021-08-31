import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, Timeline } from '../services/models'
import { getPosts, sendEne, empathyAdd, empathyRemove } from './asyncActions'

export interface PostsState {
  pageNumber: number
  pageSize: number
  posts: Post[]
  loadingCount: number
  error: boolean
  message: string
}

export const initialState: PostsState = {
  pageNumber: 1,
  pageSize: 1,
  posts: [],
  loadingCount: 0,
  error: false,
  message: '',
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loadingCount += 1
    })
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Timeline>) => {
        state.pageNumber = action.payload.pageNumber
        state.pageSize = action.payload.pageSize
        state.posts = action.payload.posts
        state.loadingCount -= 1
      }
    )
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loadingCount -= 1
      state.error = true

      state.message = action.error.message ? action.error.message : ''
    })
    builder.addCase(sendEne.fulfilled, (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts]
    })
    builder.addCase(sendEne.rejected, (state, action) => {
      state.error = true
      state.message = action.error.message ? action.error.message : ''
    })
    // 共感
    // note: 共感ボタン押した時にローディングやエラーメッセージ出すのは
    // UX悪い気がするので、一旦succeedアクションしか作ってない
    // TODO: yoshikoshi 共感ボタン押下時のエラー処理方式の検討
    builder.addCase(
      empathyAdd.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.posts.forEach((post) => {
          if (post.id === action.payload.id) {
            post.empathyUsers = action.payload.empathyUsers
            post.hasEmpathized = action.payload.hasEmpathized
            post.empathyCount = action.payload.empathyCount
          }
        })
      }
    )
    builder.addCase(
      empathyRemove.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.posts.forEach((post) => {
          if (post.id === action.payload.id) {
            post.empathyUsers = action.payload.empathyUsers
            post.hasEmpathized = action.payload.hasEmpathized
            post.empathyCount = action.payload.empathyCount
          }
        })
      }
    )
  },
})

export default postsSlice.reducer

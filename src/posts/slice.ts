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
  displayedCards: Post[]
}

export const initialState: PostsState = {
  pageNumber: 1,
  pageSize: 1,
  posts: [],
  loadingCount: 0,
  error: false,
  message: '',
  displayedCards: [],
}

const displayNum = 10

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
    },
    setDisplayedCards: (state) => {
      state.displayedCards = state.posts.slice(
        (state.pageNumber - 1) * displayNum,
        state.pageNumber * displayNum
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loadingCount += 1
    })
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Timeline>) => {
        state.pageNumber = action.payload.pageNumber
        state.pageSize = Math.ceil(action.payload.posts.length / displayNum)
        state.posts = action.payload.posts
        state.loadingCount -= 1
        state.displayedCards = action.payload.posts.slice(
          (state.pageNumber - 1) * displayNum,
          state.pageNumber * displayNum
        )
      }
    )
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loadingCount -= 1
      state.error = true

      state.message = action.error.message ? action.error.message : ''
    })
    builder.addCase(sendEne.fulfilled, (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts]
      state.displayedCards = state.posts.slice(
        (state.pageNumber - 1) * displayNum,
        state.pageNumber * displayNum
      )
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
        state.displayedCards = state.posts.slice(
          (state.pageNumber - 1) * displayNum,
          state.pageNumber * displayNum
        )
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
        state.displayedCards = state.posts.slice(
          (state.pageNumber - 1) * displayNum,
          state.pageNumber * displayNum
        )
      }
    )
  },
})

export const { setPageNumber, setDisplayedCards } = postsSlice.actions

export default postsSlice.reducer

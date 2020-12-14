import { Reducer } from 'redux'

import { Post } from '../../services/models'
import {
  PostsAction,
  POST_ENE_SUCCEED,
  POST_ENE_START,
  POSTS_SUCCEED,
} from '../actions/posts'

export interface PostsState {
  pageNumber: number
  pageSize: number
  posts: Post[]
}

export const initialState: PostsState = {
  pageNumber: 1,
  pageSize: 1,
  posts: [],
}

const postsReducer: Reducer<PostsState, PostsAction> = (
  state: PostsState = initialState,
  action: PostsAction
): PostsState => {
  switch (action.type) {
    case POSTS_SUCCEED:
      return {
        ...state,
        ...action.payload.timeline,
      }
    case POST_ENE_START:
      return {
        ...state,
      }
    case POST_ENE_SUCCEED:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    default:
      return state
  }
}

export default postsReducer

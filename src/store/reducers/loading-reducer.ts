import { Reducer } from 'redux'
import {
  PostsAction,
  POSTS_START,
  POSTS_SUCCEED,
  POSTS_FAILED,
} from '../actions/posts'

export interface LoadingState {
  loadingCount: number
}

export const initialState: LoadingState = {
  loadingCount: 0,
}

const LoadingReducer: Reducer<LoadingState, PostsAction> = (
  state: LoadingState = initialState,
  action: PostsAction
): LoadingState => {
  switch (action.type) {
    case POSTS_START:
      return {
        ...state,
        loadingCount: state.loadingCount + 1,
      }
    case POSTS_SUCCEED:
    case POSTS_FAILED:
      return {
        ...state,
        loadingCount:
          state.loadingCount > 0 ? state.loadingCount - 1 : state.loadingCount,
      }
    default: {
      return state
    }
  }
}

export default LoadingReducer

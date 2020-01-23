import { Reducer } from "redux";
import {
  PostsAction,
  FETCHING_POSTS,
  SUCCEED_POSTS,
  FAILED_POSTS
} from "../actions/posts";

export interface LoadingState {
  loadingCount: number;
}

export const initialState: LoadingState = {
  loadingCount: 0
};

const LoadingReducer: Reducer<LoadingState, PostsAction> = (
  state: LoadingState = initialState,
  action: PostsAction
): LoadingState => {
  switch (action.type) {
    case FETCHING_POSTS:
      return {
        ...state,
        loadingCount: state.loadingCount + 1
      };
    case SUCCEED_POSTS:
    case FAILED_POSTS:
      return {
        ...state,
        loadingCount:
          state.loadingCount > 0 ? state.loadingCount - 1 : state.loadingCount
      };
    default: {
      return state;
    }
  }
};

export default LoadingReducer;

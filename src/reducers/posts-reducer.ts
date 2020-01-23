import { Reducer } from "redux";

import { Post } from "../services/models";
import { PostsAction, SUCCEED_POSTS } from "../actions/posts";

export interface PostsState {
  pageNumber: number;
  pageSize: number;
  posts: Post[];
}

export const initialState: PostsState = {
  pageNumber: 1,
  pageSize: 1,
  posts: []
};

const postsReducer: Reducer<PostsState, PostsAction> = (
  state: PostsState = initialState,
  action: PostsAction
): PostsState => {
  switch (action.type) {
    case SUCCEED_POSTS:
      return {
        ...state,
        ...action.payload.timeline
      };
    default:
      return state;
  }
};

export default postsReducer;

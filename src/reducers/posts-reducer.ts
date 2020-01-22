import { Reducer } from "redux";

import { Post } from "../services/models";
import { PostsAction, SUCCEED_POSTS } from "../actions/posts";

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: []
};

const postsReducer: Reducer<PostsState, PostsAction> = (
  state: PostsState = initialState,
  action: PostsAction
): PostsState => {
  console.log(action);
  switch (action.type) {
    case SUCCEED_POSTS:
      return {
        ...state,
        posts: action.payload.posts
      };
    default: {
      return state;
    }
  }
};

export default postsReducer;

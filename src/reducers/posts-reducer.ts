import { Reducer } from "redux";

import { PostProps } from "../components/post";
import { PostsAction, SUCCEED_POSTS } from "../actions/posts";

export interface PostsState {
  posts: Array<PostProps>;
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const check: never = action.type;

      return state;
    }
  }
};

export default postsReducer;

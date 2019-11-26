import { Reducer } from "redux";

import { PostProps } from "../components/post";
import { PostsAction, ADD } from "../actions/posts";

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
  switch (action.type) {
    case ADD:
      return {
        ...state,
        posts: [
          {
            contents: action.payload.contents,
            from: action.payload.from,
            to: action.payload.to
          },
          ...state.posts
        ]
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const check: never = action.type;

      return state;
    }
  }
};

export default postsReducer;

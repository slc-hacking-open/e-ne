import { Reducer } from "redux";

import { PostProps } from "../components/post";
import { PostFormAction, SEND } from "../actions/post-form";

export interface PostsState {
  posts: Array<PostProps>;
}

export const initialState: PostsState = {
  posts: []
};

const postsReducer: Reducer<PostsState, PostFormAction> = (
  state: PostsState = initialState,
  action: PostFormAction
): PostsState => {
  switch (action.type) {
    case SEND:
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
      // const _: never = action;
      return state;
    }
  }
};

export default postsReducer;

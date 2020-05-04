import { Reducer } from "redux";
import { PostAction, SUCCEED_EMPATHY } from "../actions/post";
import { PostProps } from "../components/post";

export interface PostState {
  noStateNow: number;
  posts: Array<PostProps>;
}

const initialState: PostState = {
  noStateNow: 0,
  posts: []
};

const postReducer: Reducer<PostState, PostAction> = (
  state: PostState = initialState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case SUCCEED_EMPATHY:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default postReducer;

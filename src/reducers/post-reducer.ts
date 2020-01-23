import { Reducer } from "redux";
import { PostAction, SUCCEED_EMPATHY } from "../actions/post";

export interface PostState {
  empathyCount: number;
}

const initialState: PostState = {
  empathyCount: 0
};

const postReducer: Reducer<PostState, PostAction> = (
  state: PostState = initialState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case SUCCEED_EMPATHY:
      return state;
    default:
      return state;
  }
};

export default postReducer;

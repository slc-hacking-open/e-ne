import { Reducer } from "redux";
import { PostAction, GOOD } from "./actions/post";

export interface PostState {
  contents: string;
  from: string;
  to: string;
}

export const initialState: PostState = {
  contents: "",
  from: "",
  to: "",
};

const postReducer: Reducer<PostState> = (
  state: PostState = initialState,
  action: PostAction,
): PostState => {
  switch (action.type) {
    case GOOD:
      return {
        ...state,
        contents: "goodが押されたよ！",
      };
    default: {
      // const _: never = action;

      return state;
    }
  }
};

export default postReducer;

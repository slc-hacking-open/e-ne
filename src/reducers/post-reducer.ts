import { Reducer } from "redux";
import { PostAction, EMPATHY, SEND } from "../actions/post";

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
    case EMPATHY:
      return {
        ...state,
        contents: "goodが押されたよ！",
      };
    case SEND:
      return {
        ...state,
        contents: action.payload.contents,
        from: action.payload.from,
        to: action.payload.to,
      };
    default: {
      // const _: never = action;

      return state;
    }
  }
};

export default postReducer;

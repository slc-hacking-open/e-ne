import { Reducer } from "redux";
import {
  PostFormAction,
  CHANGE_CONTENTS,
  CHANGE_TO,
  CLEAR
} from "../actions/post-form";

export interface PostFormState {
  contents: string;
  to: string;
}

export const initialState: PostFormState = {
  contents: "",
  to: ""
};

const postFormReducer: Reducer<PostFormState, PostFormAction> = (
  state: PostFormState = initialState,
  action: PostFormAction
): PostFormState => {
  switch (action.type) {
    case CHANGE_CONTENTS:
      return {
        ...state,
        contents: action.payload.contents
      };
    case CHANGE_TO:
      return {
        ...state,
        to: action.payload.to
      };
    case CLEAR:
      return {
        ...state,
        contents: "",
        to: ""
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const check: never = action;

      return state;
    }
  }
};

export default postFormReducer;

import { Reducer } from "redux";
import {
  PostFormAction,
  SEND,
  CHANGE_CONTENTS,
  CHANGE_TO
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
    case SEND:
      return {
        ...state,
        contents: "",
        to: ""
      };
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
    default: {
      // const _: never = action;
      return state;
    }
  }
};

export default postFormReducer;

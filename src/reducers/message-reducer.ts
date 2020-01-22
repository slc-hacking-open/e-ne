import { Reducer } from "redux";
import { PostsAction, FAILED_POSTS } from "../actions/posts";

export interface MessageState {
  error: boolean;
  message: string;
}

export const initialState: MessageState = {
  error: false,
  message: ""
};

const MessageReducer: Reducer<MessageState, PostsAction> = (
  state: MessageState = initialState,
  action: PostsAction
): MessageState => {
  switch (action.type) {
    case FAILED_POSTS:
      return {
        ...state,
        error: action.error,
        message: action.payload.error.message
      };
    default: {
      return state;
    }
  }
};

export default MessageReducer;

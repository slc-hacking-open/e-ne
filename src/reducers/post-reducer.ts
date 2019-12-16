import { Reducer } from "redux";

import { PostAction, EMPATHY } from "../actions/post";

const postsReducer: Reducer<{}, PostAction> = (
  state = {},
  action: PostAction
): {} => {
  switch (action.type) {
    case EMPATHY:
      return state;
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const check: never = action.type;

      return state;
    }
  }
};

export default postsReducer;

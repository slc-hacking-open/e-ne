import { Reducer, combineReducers } from "redux";

import postsReducer from "./reducers/posts-reducer";
import senderReducer from "./reducers/sender-reducer";

export const rootReducer: Reducer = combineReducers({
  posts: postsReducer,
  sender: senderReducer
});
export type AppState = ReturnType<typeof rootReducer>;

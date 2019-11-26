import { Reducer, combineReducers } from "redux";

import postsReducer from "./reducers/posts-reducer";
import postFormReducer from "./reducers/post-form-reducer";

export const rootReducer: Reducer = combineReducers({
  posts: postsReducer,
  postForm: postFormReducer
});
export type AppState = ReturnType<typeof rootReducer>;

import { Reducer, combineReducers } from "redux";

import postsReducer from "./reducers/posts-reducer";
import postFormReducer from "./reducers/post-form-reducer";
import profileReducer from "./reducers/profile-reducer";

export const rootReducer: Reducer = combineReducers({
  posts: postsReducer,
  postForm: postFormReducer,
  profile: profileReducer
});
export type AppState = ReturnType<typeof rootReducer>;

import { combineReducers } from "redux";

import postReducer from "./reducers/post-reducer";
import postsReducer from "./reducers/posts-reducer";
import postFormReducer from "./reducers/post-form-reducer";
import loadingReducer from "./reducers/loading-reducer";

export const rootReducer = combineReducers({
  post: postReducer,
  posts: postsReducer,
  postForm: postFormReducer,
  loading: loadingReducer
});

export type AppState = ReturnType<typeof rootReducer>;

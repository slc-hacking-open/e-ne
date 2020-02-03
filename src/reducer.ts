import { combineReducers } from "redux";

import postReducer from "./reducers/post-reducer";
import postsReducer from "./reducers/posts-reducer";
import postFormReducer from "./reducers/post-form-reducer";
import loadingReducer from "./reducers/loading-reducer";
import messageReducer from "./reducers/message-reducer";
import profileReducer from "./reducers/profile-reducer";

export const rootReducer = combineReducers({
  post: postReducer,
  posts: postsReducer,
  postForm: postFormReducer,
  loading: loadingReducer,
  message: messageReducer,
  profile: profileReducer
});

export type AppState = ReturnType<typeof rootReducer>;

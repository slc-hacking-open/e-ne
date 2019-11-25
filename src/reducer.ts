import { Reducer, combineReducers } from "redux";

import postReducer from "./reducers/post-reducer";
import postFormReducer from "./reducers/post-form-reducer";

export const rootReducer: Reducer = combineReducers({
  post: postReducer,
  postForm: postFormReducer
});
export type AppState = ReturnType<typeof rootReducer>;

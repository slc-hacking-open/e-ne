import { Reducer, combineReducers } from "redux";

import postReducer from "./reducers/post-reducer";

export const rootReducer: Reducer = combineReducers({ post: postReducer });
export type AppState = ReturnType<typeof rootReducer>;

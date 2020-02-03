import { Dispatch } from "redux";
import { Timeline } from "../services/models";
import { getTimeline } from "../services/posts";

// async actions
export const FETCHING_POSTS = "FETCHING_POSTS";
export const SUCCEED_POSTS = "SUCCEED_POSTS";
export const FAILED_POSTS = "FAILED_POSTS";
export const ADD = "ADD";

export const fetchingPosts = () => ({
  type: FETCHING_POSTS as typeof FETCHING_POSTS
});

export const succeedPosts = (result: Timeline) => ({
  type: SUCCEED_POSTS as typeof SUCCEED_POSTS,
  payload: {
    timeline: result
  }
});

export const failedPosts = (error: Error) => ({
  type: FAILED_POSTS as typeof FAILED_POSTS,
  payload: {
    error
  },
  error: true
});

export const getPosts = (userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchingPosts());
      const result = await getTimeline(userId, 1);
      dispatch(succeedPosts(result));
    } catch (error) {
      dispatch(failedPosts(error));
    }
  };
};

export const add = (contents: string, from: string, to: string) => ({
  type: ADD as typeof ADD,
  payload: {
    contents,
    from,
    to
  }
});

export type PostsAction =
  | ReturnType<typeof fetchingPosts>
  | ReturnType<typeof succeedPosts>
  | ReturnType<typeof failedPosts>;

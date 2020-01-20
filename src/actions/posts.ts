import { Dispatch } from "redux";
import { fetchPosts } from "../services/api";

// async actions
export const FETCHING_POSTS = "FETCHING_POSTS";
export const SUCCEED_POSTS = "SUCCEED_POSTS";
export const FAILED_POSTS = "FAILED_POSTS";

export const fetchingPosts = () => ({
  type: FETCHING_POSTS as typeof FETCHING_POSTS
});

export const succeedPosts = (result: any) => ({
  type: SUCCEED_POSTS as typeof SUCCEED_POSTS,
  payload: {
    posts: result
  }
});

export const failedPosts = (error: Error) => ({
  type: FAILED_POSTS as typeof FAILED_POSTS,
  payload: {
    error
  },
  error: true
});

export const getPosts = (userId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchingPosts());
      const result = await fetchPosts(userId);
      console.log(result);
      dispatch(succeedPosts(result));
    } catch (error) {
      dispatch(failedPosts(error));
    }
  };
};

export type PostsAction =
  | ReturnType<typeof fetchingPosts>
  | ReturnType<typeof succeedPosts>
  | ReturnType<typeof failedPosts>;

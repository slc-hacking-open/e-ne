import { Dispatch } from "redux";
import { Timeline, Post } from "../services/models";
import { postPost, getTimeline } from "../services/posts";

// async actions
export const FETCHING_POSTS = "FETCHING_POSTS";
export const SUCCEED_POSTS = "SUCCEED_POSTS";
export const FAILED_POSTS = "FAILED_POSTS";
export const POST_ENE = "POST_ENE";
export const SUCCEED_POST = "SUCCEED_POST";

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

export const getPosts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchingPosts());
      const result = await getTimeline("SLC／生保ソリューション第２部");
      dispatch(succeedPosts(result));
    } catch (error) {
      dispatch(failedPosts(error));
    }
  };
};

export const Ene = {
  start: () => ({
    type: POST_ENE as typeof POST_ENE
  }),

  succeed: (result: Post) => ({
    type: SUCCEED_POST as typeof SUCCEED_POST,
    payload: result
  })
};

export const sendEne = (
  senderId: string,
  receiverId: string,
  contents: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(Ene.start());
      const result = await postPost(senderId, receiverId, contents);
      dispatch(Ene.succeed(result));
    } catch (error) {
      console.log(error);
    }
  };
};

export type PostsAction =
  | ReturnType<typeof fetchingPosts>
  | ReturnType<typeof succeedPosts>
  | ReturnType<typeof failedPosts>
  | ReturnType<typeof Ene.start>
  | ReturnType<typeof Ene.succeed>;

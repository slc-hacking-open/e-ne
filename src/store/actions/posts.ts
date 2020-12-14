import { Dispatch } from 'redux'
import { Timeline, Post } from '../../services/models'
import { postPost, getTimeline } from '../../services/posts'

// タイムライン取得
export const POSTS_START = 'POSTS_START'
export const POSTS_SUCCEED = 'POSTS_SUCCEED'
export const POSTS_FAILED = 'POSTS_FAILED'

type Start = {
  type: typeof POSTS_START
}

type Succeed = {
  type: typeof POSTS_SUCCEED
  payload: {
    timeline: Timeline
  }
}

type Fail = {
  type: typeof POSTS_FAILED
  payload: {
    error: Error
  }
  error: true
}

export const Posts = {
  start: (): Start => ({
    type: POSTS_START as typeof POSTS_START,
  }),

  succeed: (result: Timeline): Succeed => ({
    type: POSTS_SUCCEED as typeof POSTS_SUCCEED,
    payload: {
      timeline: result,
    },
  }),

  failed: (error: Error): Fail => ({
    type: POSTS_FAILED,
    payload: {
      error,
    },
    error: true,
  }),
}

export const getPosts = (department: string, userid: string) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(Posts.start())
      const result = await getTimeline(department, userid)
      dispatch(Posts.succeed(result))
    } catch (error) {
      dispatch(Posts.failed(error))
    }
  }
}

// いいね投稿
export const POST_ENE_START = 'POST_ENE_START'
export const POST_ENE_SUCCEED = 'POST_ENE_SUCCEED'

type PostEneStart = {
  type: typeof POST_ENE_START
}

type PostEneSucceed = {
  type: typeof POST_ENE_SUCCEED
  payload: Post
}

export const Ene = {
  start: (): PostEneStart => ({
    type: POST_ENE_START,
  }),

  succeed: (result: Post): PostEneSucceed => ({
    type: POST_ENE_SUCCEED,
    payload: result,
  }),
}

export const sendEne = (
  senderId: string,
  receiverId: string,
  contents: string
) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(Ene.start())
      const result = await postPost(senderId, receiverId, contents)
      dispatch(Ene.succeed(result))
    } catch (error) {
      console.log(error)
    }
  }
}

export type PostsAction = Start | Succeed | Fail | PostEneStart | PostEneSucceed

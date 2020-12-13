import thunk, { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import configureMockStore from 'redux-mock-store'
import {
  Posts,
  POSTS_START,
  POSTS_SUCCEED,
  POSTS_FAILED,
  POST_ENE_START,
  Ene,
  POST_ENE_SUCCEED,
  PostsAction,
  getPosts,
  sendEne,
} from './posts'
import { User } from '../../services/models'
import * as postsService from '../../services/posts'

describe('postsのアクションのテスト', () => {
  it('タイムライン取得開始のアクション', () => {
    const expectedAction = {
      type: POSTS_START,
    }
    expect(Posts.start()).toEqual(expectedAction)
  })
  it('タイムライン取得成功のアクション', () => {
    const result = {
      pageNumber: 1,
      pageSize: 5,
      posts: [
        {
          department: 'ソリューション部',
          id: 'ene01',
          sender: {} as User,
          receiver: {} as User,
          contents: 'contest',
          datetime: '',
          empathyCount: 1,
          hasEmpathized: true,
        },
      ],
    }
    const expectedAction = {
      type: POSTS_SUCCEED,
      payload: {
        timeline: result,
      },
    }
    expect(Posts.succeed(result)).toEqual(expectedAction)
  })
  it('タイムライン取得失敗のアクション', () => {
    const error = new Error('error')
    const expectedAction = {
      type: POSTS_FAILED,
      payload: {
        error,
      },
      error: true,
    }
    expect(Posts.failed(error)).toEqual(expectedAction)
  })
  it('いいね投稿開始のアクション', () => {
    const expectedAction = {
      type: POST_ENE_START,
    }
    expect(Ene.start()).toEqual(expectedAction)
  })
  it('いいね投稿成功のアクション', () => {
    const result = {
      department: 'ソリューション部',
      id: 'ene01',
      sender: {} as User,
      receiver: {} as User,
      contents: 'contest',
      datetime: '',
      empathyCount: 1,
      hasEmpathized: true,
    }
    const expectedAction = {
      type: POST_ENE_SUCCEED,
      payload: result,
    }
    expect(Ene.succeed(result)).toEqual(expectedAction)
  })
})

describe('非同期アクション（タイムラインの取得）のテスト', () => {
  const middlewares = [thunk]
  type DispatchExts = ThunkDispatch<PostsAction, void, AnyAction>
  const mockStore = configureMockStore<PostsAction, DispatchExts>(middlewares)
  const department = 'ソリューション部'
  const userId = 'user01'
  it('タイムラインの取得成功時に、タイムライン取得開始のアクションとタイムライン取得成功のアクションが生成されること', () => {
    const result = {
      pageNumber: 1,
      pageSize: 5,
      posts: [
        {
          department: 'ソリューション部',
          id: 'ene01',
          sender: {} as User,
          receiver: {} as User,
          contents: 'contest',
          datetime: '',
          empathyCount: 1,
          hasEmpathized: true,
        },
      ],
    }
    const expectedAction = [
      {
        type: POSTS_START,
      },
      {
        type: POSTS_SUCCEED,
        payload: {
          timeline: result,
        },
      },
    ]
    const store = mockStore()
    const spy = jest
      .spyOn(postsService, 'getTimeline')
      .mockReturnValueOnce(Promise.resolve(result))

    return store.dispatch(getPosts(department, userId)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(department, userId)
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
  it('タイムラインの取得失敗時に、タイムライン取得開始のアクションとタイムライン取得失敗のアクションが生成されること', () => {
    const error = new Error('error')
    const expectedAction = [
      {
        type: POSTS_START,
      },
      {
        type: POSTS_FAILED,
        payload: {
          error,
        },
        error: true,
      },
    ]
    const store = mockStore()
    const spy = jest
      .spyOn(postsService, 'getTimeline')
      .mockReturnValueOnce(Promise.reject(error))

    return store.dispatch(getPosts(department, userId)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(department, userId)
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})

describe('非同期アクション（いいねの投稿）のテスト', () => {
  const middlewares = [thunk]
  type DispatchExts = ThunkDispatch<PostsAction, void, AnyAction>
  const mockStore = configureMockStore<PostsAction, DispatchExts>(middlewares)
  const senderId = 'user01'
  const receiverId = 'user02'
  const contents = 'contents'
  it('いいね投稿成功時に、いいね投稿開始のアクションといいね投稿成功のアクションが生成されること', () => {
    const result = {
      department: 'ソリューション部',
      id: 'ene01',
      sender: {} as User,
      receiver: {} as User,
      contents: 'contest',
      datetime: '',
      empathyCount: 1,
      hasEmpathized: true,
    }
    const expectedAction = [
      {
        type: POST_ENE_START,
      },
      {
        type: POST_ENE_SUCCEED,
        payload: result,
      },
    ]
    const store = mockStore()
    const spy = jest
      .spyOn(postsService, 'postPost')
      .mockReturnValueOnce(Promise.resolve(result))

    return store.dispatch(sendEne(senderId, receiverId, contents)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(senderId, receiverId, contents)
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})

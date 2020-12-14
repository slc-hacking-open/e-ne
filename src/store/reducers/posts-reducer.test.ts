import { PostsAction, POSTS_SUCCEED, POST_ENE_SUCCEED } from '../actions/posts'
import postsReducer, { initialState } from './posts-reducer'
import { User } from '../../services/models'

describe('postsのレデューサーのテスト', () => {
  const postsTestData = {
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
  const postTestData = {
    department: 'ソリューション部１',
    id: 'ene01',
    sender: {} as User,
    receiver: {} as User,
    contents: 'contest2',
    datetime: '',
    empathyCount: 0,
    hasEmpathized: false,
  }
  it('初期状態のテスト', () => {
    expect(postsReducer(undefined, {} as PostsAction)).toEqual(initialState)
  })
  it('タイムライン取得成功時に取得結果のタイムラインが設定されること', () => {
    expect(
      postsReducer(initialState, {
        type: POSTS_SUCCEED,
        payload: {
          timeline: postsTestData,
        },
      })
    ).toEqual(postsTestData)
  })
  it('いいね投稿開始時にストアの内容が変更されないこと', () => {
    expect(
      postsReducer(postsTestData, {
        type: 'POST_ENE_START',
      })
    ).toEqual(postsTestData)
  })
  it('いいね投稿成功時にタイムラインの投稿内容が更新されること', () => {
    expect(
      postsReducer(postsTestData, {
        type: POST_ENE_SUCCEED,
        payload: postTestData,
      })
    ).toEqual({
      ...postsTestData,
      posts: [postTestData, ...postsTestData.posts],
    })
  })
})

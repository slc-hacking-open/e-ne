import { AnyAction } from 'redux'
import { User } from '../services/models'
import postsSlice, { initialState, PostsState } from './slice'
import { getPosts, sendEne } from './asyncActions'

describe('postsのレデューサーのテスト', () => {
  const postsTestData: PostsState = {
    pageNumber: 1,
    pageSize: 5,
    posts: [
      {
        id: 'ene01',
        sender: {} as User,
        receiver: {} as User,
        contents: 'contest',
        datetime: '',
        empathyCount: 1,
        hasEmpathized: true,
      },
    ],
    error: false,
    loadingCount: 1,
    message: '',
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
    expect(postsSlice(undefined, {} as AnyAction)).toEqual(initialState)
  })
  it('タイムライン取得開始時ロードカウントが+1されること', () => {
    expect(
      postsSlice(initialState, {
        type: getPosts.pending.type,
      })
    ).toEqual({
      ...initialState,
      loadingCount: initialState.loadingCount + 1,
    })
  })
  it('タイムライン取得成功時に取得結果のタイムラインが設定され、ロードカウントが-1されること', () => {
    expect(
      postsSlice(initialState, {
        type: getPosts.fulfilled.type,
        payload: postsTestData,
      })
    ).toEqual({
      ...postsTestData,
      loadingCount: initialState.loadingCount - 1,
    })
  })
  it('タイムライン取得失敗時にエラー情報が設定され、ロードカウントが-1されること', () => {
    const message = 'error'
    expect(
      postsSlice(postsTestData, {
        type: getPosts.rejected.type,
        error: { message },
      })
    ).toEqual({
      ...postsTestData,
      loadingCount: postsTestData.loadingCount - 1,
      error: true,
      message,
    })
  })
  it('いいね投稿成功時にタイムラインの投稿内容が更新されること', () => {
    expect(
      postsSlice(postsTestData, {
        type: sendEne.fulfilled.type,
        payload: postTestData,
      })
    ).toEqual({
      ...postsTestData,
      posts: [postTestData, ...postsTestData.posts],
    })
  })
})

import { AnyAction } from 'redux'
import { User } from '../services/models'
import postsSlice, {
  initialState,
  PostsState,
  setPageNumber,
  setDisplayedCards,
} from './slice'
import { getPosts, sendEne, empathyAdd, empathyRemove } from './asyncActions'

describe('postsのレデューサーのテスト', () => {
  const postsTestData: PostsState = {
    pageNumber: 1,
    pageSize: 5,
    posts: [
      {
        id: 'ene01',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 1,
        hasEmpathized: true,
        empathyUsers: [],
      },
      {
        id: 'ene02',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 1,
        hasEmpathized: true,
        empathyUsers: [],
      },
    ],
    displayedCards: [
      {
        id: 'ene01',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 1,
        hasEmpathized: true,
        empathyUsers: [],
      },
      {
        id: 'ene02',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 1,
        hasEmpathized: true,
        empathyUsers: [],
      },
    ],
    error: false,
    loadingCount: 1,
    message: '',
  }
  const postTestData = {
    id: 'ene01',
    sender: {} as User,
    receiver: {} as User,
    contents: 'content2',
    datetime: '',
    empathyCount: 0,
    hasEmpathized: false,
    empathyUsers: [{} as User],
  }
  const empathyExceptData = {
    pageNumber: 1,
    pageSize: 5,
    posts: [
      {
        id: 'ene01',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 0,
        hasEmpathized: false,
        empathyUsers: [{} as User],
      },
      {
        id: 'ene02',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 1,
        hasEmpathized: true,
        empathyUsers: [],
      },
    ],
    displayedCards: [
      {
        id: 'ene01',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 0,
        hasEmpathized: false,
        empathyUsers: [{} as User],
      },
      {
        id: 'ene02',
        sender: {} as User,
        receiver: {} as User,
        contents: 'content',
        datetime: '',
        empathyCount: 1,
        hasEmpathized: true,
        empathyUsers: [],
      },
    ],
    error: false,
    loadingCount: 1,
    message: '',
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
      pageSize: 1,
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
      displayedCards: [postTestData, ...postsTestData.posts],
    })
  })
  it('共感追加時に共感したいいねカード内容が更新されること', () => {
    expect(
      postsSlice(postsTestData, {
        type: empathyAdd.fulfilled.type,
        payload: postTestData,
      })
    ).toEqual(empathyExceptData)
  })
  it('共感削除時に共感したいいねカード内容が更新されること', () => {
    expect(
      postsSlice(postsTestData, {
        type: empathyRemove.fulfilled.type,
        payload: postTestData,
      })
    ).toEqual(empathyExceptData)
  })
  it('ページ番号変更時に変更内容が設定されること', () => {
    const pageNumber = 2
    expect(postsSlice(postsTestData, setPageNumber(pageNumber))).toEqual({
      ...postsTestData,
      pageNumber: 2,
    })
  })
  it('ページング押下時、画面表示するいいねが設定されること', () => {
    const pagingTestData: PostsState = {
      pageNumber: 1,
      pageSize: 1,
      posts: new Array(15),
      displayedCards: [],
      error: false,
      loadingCount: 1,
      message: '',
    }
    expect(postsSlice(pagingTestData, setDisplayedCards())).toEqual({
      ...pagingTestData,
      displayedCards: new Array(10),
    })
  })
})

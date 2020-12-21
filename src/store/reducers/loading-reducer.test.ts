import { PostsAction } from '../actions/posts'
import LoadingReducer, { initialState } from './loading-reducer'
import { Timeline } from '../../services/models'

describe('loadingのレデューサーのテスト', () => {
  it('初期状態のテスト', () => {
    expect(LoadingReducer(undefined, {} as PostsAction)).toEqual(initialState)
  })
  it('タイムライン取得時にローディングカウントが＋１されること', () => {
    const loadingCount = 1

    expect(
      LoadingReducer(
        { loadingCount },
        {
          type: 'POSTS_START',
        }
      )
    ).toEqual({ loadingCount: 2 })
  })
  it('タイムライン取得成功時にローディングカウントが１以上の場合カウントが―１されること', () => {
    const loadingCount = 1

    expect(
      LoadingReducer(
        { loadingCount },
        {
          type: 'POSTS_SUCCEED',
          payload: { timeline: {} as Timeline },
        }
      )
    ).toEqual({ loadingCount: 0 })
  })
  it('タイムライン取得成功時にローディングカウントが０以下の場合カウントが―１されないこと', () => {
    const loadingCount = 0

    expect(
      LoadingReducer(
        { loadingCount },
        {
          type: 'POSTS_SUCCEED',
          payload: { timeline: {} as Timeline },
        }
      )
    ).toEqual({ loadingCount: 0 })
  })
  it('タイムライン取得失敗時にローディングカウントが１以上の場合カウントが―１されること', () => {
    const loadingCount = 1

    expect(
      LoadingReducer(
        { loadingCount },
        {
          type: 'POSTS_FAILED',
          payload: { error: new Error() },
          error: true,
        }
      )
    ).toEqual({ loadingCount: 0 })
  })
  it('タイムライン取得失敗時にローディングカウントが０以下の場合カウントが―１されないこと', () => {
    const loadingCount = 0

    expect(
      LoadingReducer(
        { loadingCount },
        {
          type: 'POSTS_FAILED',
          payload: { error: new Error() },
          error: true,
        }
      )
    ).toEqual({ loadingCount: 0 })
  })
})

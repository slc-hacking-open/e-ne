import { PostsAction } from '../actions/posts'
import MessageReducer, { initialState } from './message-reducer'

describe('messageのレデューサーのテスト', () => {
  it('初期状態のテスト', () => {
    expect(MessageReducer(undefined, {} as PostsAction)).toEqual(initialState)
  })

  it('タイムライン取得失敗時にエラーメッセージが設定されること', () => {
    const error = true
    const message = 'ServerError.'

    expect(
      MessageReducer(
        { error: false, message: '' },
        {
          type: 'POSTS_FAILED',
          payload: { error: new Error(message) },
          error,
        }
      )
    ).toEqual({ error, message })
  })
})

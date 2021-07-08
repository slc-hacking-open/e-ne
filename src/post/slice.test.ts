import { AnyAction } from 'redux'
import { User } from '../services/models'
import postSlice, { initialState } from './slice'
import { empathyAdd, empathyRemove } from './asycActions'

describe('postのレデューサーのテスト', () => {
  it('初期状態のテスト', () => {
    expect(postSlice(undefined, {} as AnyAction)).toEqual(initialState)
  })
  it('共感追加時にstateがそのまま設定されること', () => {
    const post = {
      noStateNow: 2,
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
    expect(
      postSlice(post, {
        type: empathyAdd.fulfilled.type,
      })
    ).toEqual({ noStateNow: post.noStateNow, posts: post.posts })
  })
  it('共感削除時にstateがそのまま設定されること', () => {
    const post = {
      noStateNow: 2,
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
    expect(
      postSlice(post, {
        type: empathyRemove.fulfilled.type,
      })
    ).toEqual({ noStateNow: post.noStateNow, posts: post.posts })
  })
})

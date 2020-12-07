import postReducer, { initialState } from './post-reducer'
import { PostAction } from '../actions/post'
import { User } from '../../services/models'

describe('postのレデューサーのテスト', () => {
  it('初期状態のテスト', () => {
    expect(postReducer(undefined, {} as PostAction)).toEqual(initialState)
  })
  it('共感数更新時にstateがそのまま設定されること', () => {
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
      postReducer(post, {
        type: 'EMPATHY_SUCCEED',
        payload: { result: true },
      })
    ).toEqual({ noStateNow: post.noStateNow, posts: post.posts })
  })
})

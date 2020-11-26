import thunkProfileReducer, { initialState } from './profile-reducer'
import { ProfileAction } from '../actions/profile'

describe('プロフィールのレデューサーのテスト', () => {
  const testUserData = {
    userid: 'user01',
    department: 'ソリューション部',
    name: '生保花子',
    profile: '趣味は園芸',
    imageurl: 'url',
  }
  it('初期状態のテスト', () => {
    expect(thunkProfileReducer(undefined, {} as ProfileAction)).toEqual(
      initialState
    )
  })
  it('プロフィール取得開始時にユーザーはすべてブランクが設定され，ロード有無は有の状態となること', () => {
    expect(
      thunkProfileReducer(initialState, {
        type: 'PROFILE_START',
        payload: { userid: 'user01' },
      })
    ).toEqual({
      user: {
        imageurl: '',
        name: '',
        profile: '',
        userid: '',
        department: '',
      },
      isLoading: true,
    })
  })
  it('プロフィール取得成功時にユーザーには取得結果のユーザー情報が設定され、ロード有無は無の状態となること', () => {
    const param = { userid: 'user01' }
    const result = {
      user: testUserData,
    }
    expect(
      thunkProfileReducer(initialState, {
        type: 'PROFILE_SUCCEED',
        payload: { param, result },
      })
    ).toEqual({
      user: result.user,
      isLoading: false,
    })
  })
  it('プロフィール取得失敗にユーザーは元の状態のままで、ロード有無は無の状態となること', () => {
    const param = { userid: 'user01' }
    const state = { user: testUserData, isLoading: true }
    expect(
      thunkProfileReducer(state, {
        type: 'PROFILE_FAILURE',
        payload: { param, message: 'error' },
        error: true,
      })
    ).toEqual({
      user: state.user,
      isLoading: false,
    })
  })
})

import { AnyAction } from 'redux'
import profileSlice, { initialState } from './slice'
import { getProfile } from './asyncActions'

describe('profileのレデューサーのテスト', () => {
  const testUserData = {
    userid: 'user01',
    department: 'ソリューション部',
    name: '生保花子',
    profile: '趣味は園芸',
    imageurl: 'url',
  }
  it('初期状態のテスト', () => {
    expect(profileSlice(undefined, {} as AnyAction)).toEqual(initialState)
  })
  it('プロフィール取得開始時にユーザーはすべてブランクが設定され，ロード有無は有の状態となること', () => {
    expect(
      profileSlice(initialState, {
        type: getProfile.pending.type,
      })
    ).toEqual({
      user: {
        imageurl: '',
        name: '',
        profile: '',
        userid: '',
        department: 'a',
      },
      isLoading: true,
    })
  })
  it('プロフィール取得成功時にユーザーには取得結果のユーザー情報が設定され、ロード有無は無の状態となること', () => {
    const result = {
      user: testUserData,
    }
    expect(
      profileSlice(initialState, {
        type: getProfile.fulfilled.type,
        payload: result,
      })
    ).toEqual({
      user: result.user,
      isLoading: false,
    })
  })
  it('プロフィール取得失敗にユーザーは元の状態のままで、ロード有無は無の状態となること', () => {
    const state = { user: testUserData, isLoading: true }
    expect(
      profileSlice(state, {
        type: getProfile.rejected.type,
      })
    ).toEqual({
      user: state.user,
      isLoading: false,
    })
  })
})

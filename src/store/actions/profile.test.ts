import thunk, { ThunkDispatch } from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { AnyAction } from 'redux'
import {
  ProfileAction,
  getProfile,
  PROFILE_START,
  Profile,
  PROFILE_SUCCEED,
  PROFILE_FAILURE,
} from './profile'
import * as getUserProfile from '../../services/users'
import { User } from '../../services/models'

const testUserData: User = {
  userid: 'user01',
  department: 'ソリューション部',
  name: '生保花子',
  profile: '趣味は園芸',
  imageurl: 'url',
}
describe('プロフィールのアクションのテスト', () => {
  const param = { userid: 'user01' }
  it('プロフィール取得開始のアクション', () => {
    const expectedAction = {
      type: PROFILE_START,
      payload: param,
    }
    expect(Profile.start(param)).toEqual(expectedAction)
  })
  it('プロフィール取得成功のアクション', () => {
    const result = {
      user: testUserData,
    }
    const expectedAction = {
      type: PROFILE_SUCCEED,
      payload: { param, result },
    }
    expect(Profile.succeed(param, result)).toEqual(expectedAction)
  })
  it('プロフィール取得失敗のアクション', () => {
    const message = 'Server error.'
    const expectedAction = {
      type: PROFILE_FAILURE,
      payload: { param, message },
      error: true,
    }
    expect(Profile.fail(param, message)).toEqual(expectedAction)
  })
})

describe('非同期アクション（プロフィール取得）のテスト', () => {
  const middlewares = [thunk]
  type DispatchExts = ThunkDispatch<ProfileAction, void, AnyAction>
  const mockStore = configureMockStore<ProfileAction, DispatchExts>(middlewares)
  const param = { userid: 'user01' }
  it('プロフィール取得成功時に、プロフィール取得開始および、プロフィール取得成功のアクションが生成されること', () => {
    const result = {
      user: testUserData,
    }
    const expectedActions = [
      { type: PROFILE_START, payload: param },
      { type: PROFILE_SUCCEED, payload: { param, result } },
    ]

    const store = mockStore()
    const spy = jest
      .spyOn(getUserProfile, 'getUserProfile')
      .mockReturnValueOnce(Promise.resolve(result.user))

    return store.dispatch(getProfile(param.userid)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(param.userid)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  it('プロフィール取得失敗時に、プロフィール取得開始および、プロフィール取得失敗のアクションが生成されること', () => {
    const message = 'Server Error.'
    const expectedActions = [
      { type: PROFILE_START, payload: param },
      { type: PROFILE_FAILURE, payload: { param, message }, error: true },
    ]

    const store = mockStore()
    const spy = jest
      .spyOn(getUserProfile, 'getUserProfile')
      .mockReturnValueOnce(Promise.reject(new Error()))

    return store.dispatch(getProfile(param.userid)).catch(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(param.userid)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

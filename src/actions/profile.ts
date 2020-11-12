import { Dispatch } from 'redux'
import { User } from '../services/models'
import { getUserProfile } from '../services/users'

interface GetProfileParam {
  userid: string
}

interface GetProfileResult {
  user: User
}

// プロフィール取得
export const PROFILE_START = 'PROFILE_START'
export const PROFILE_SUCCEED = 'PROFILE_SUCCEED'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'

export const Profile = {
  start: (param: GetProfileParam) => ({
    type: PROFILE_START as typeof PROFILE_START,
    payload: param,
  }),

  succeed: (param: GetProfileParam, result: GetProfileResult) => ({
    type: PROFILE_SUCCEED as typeof PROFILE_SUCCEED,
    payload: { param, result },
  }),

  fail: (param: GetProfileParam, message: string) => ({
    type: PROFILE_FAILURE as typeof PROFILE_FAILURE,
    payload: { param, message },
    error: true,
  }),
}

export const getProfile = (userid: string) => {
  const param: GetProfileParam = { userid }

  return async (dispatch: Dispatch) => {
    try {
      dispatch(Profile.start(param))
      const user = await getUserProfile(userid)
      const result: GetProfileResult = { user }
      dispatch(Profile.succeed(param, result))
    } catch (error) {
      dispatch(Profile.fail(param, 'Server Error.'))
    }
  }
}

export type ProfileAction =
  | ReturnType<typeof Profile.start>
  | ReturnType<typeof Profile.succeed>
  | ReturnType<typeof Profile.fail>

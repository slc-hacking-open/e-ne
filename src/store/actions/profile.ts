import { Dispatch } from 'redux'
import { User } from '../../services/models'
import { getUserProfile } from '../../services/users'

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

type Start = {
  type: typeof PROFILE_START
  payload: GetProfileParam
}

type Succeed = {
  type: typeof PROFILE_SUCCEED
  payload: { param: GetProfileParam; result: GetProfileResult }
}

type Fail = {
  type: typeof PROFILE_FAILURE
  payload: { param: GetProfileParam; message: string }
  error: true
}

export const Profile = {
  start: (param: GetProfileParam): Start => ({
    type: 'PROFILE_START',
    payload: param,
  }),

  succeed: (param: GetProfileParam, result: GetProfileResult): Succeed => ({
    type: PROFILE_SUCCEED as typeof PROFILE_SUCCEED,
    payload: { param, result },
  }),

  fail: (param: GetProfileParam, message: string): Fail => ({
    type: PROFILE_FAILURE as typeof PROFILE_FAILURE,
    payload: { param, message },
    error: true,
  }),
}
export type ProfileAction = Start | Succeed | Fail
export const getProfile = (
  userid: string
): ((dispatch: Dispatch) => Promise<void>) => {
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

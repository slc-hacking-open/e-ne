import { Dispatch } from "redux";
import { User } from "../services/models";
import { getProfileFactory } from "../services/api";

interface GetProfileParam {
  userid: string;
}

interface GetProfileResult {
  user: User;
}

export const THUNK_PROFILE_START = "THUNK_PROFILE_START";
export const THUNK_PROFILE_SUCCEED = "THUNK_PROFILE_SUCCEED";
export const THUNK_PROFILE_FAILURE = "THUNK_PROFILE_FAILURE";

export const thunkProfile = {
  start: (param: GetProfileParam) => ({
    type: THUNK_PROFILE_START as typeof THUNK_PROFILE_START,
    payload: param
  }),

  succeed: (param: GetProfileParam, result: GetProfileResult) => ({
    type: THUNK_PROFILE_SUCCEED as typeof THUNK_PROFILE_SUCCEED,
    payload: { param, result }
  }),

  // fail: (param: GetProfileParam, error: AxiosError) => ({
  fail: (param: GetProfileParam, message: string) => ({
    type: THUNK_PROFILE_FAILURE as typeof THUNK_PROFILE_FAILURE,
    payload: { param, message },
    error: true
  })
};

export const getProfileByThunk = (userid: string) => {
  const param: GetProfileParam = { userid };

  return async (dispatch: Dispatch) => {
    try {
      dispatch(thunkProfile.start(param));
      const getProfile = getProfileFactory();
      const user = await getProfile(userid);
      const result: GetProfileResult = { user };
      dispatch(thunkProfile.succeed(param, result));
    } catch (error) {
      dispatch(thunkProfile.fail(param, "Server Error."));
    }
  };
};

export type ThunkProfileAction =
  | ReturnType<typeof thunkProfile.start>
  | ReturnType<typeof thunkProfile.succeed>
  | ReturnType<typeof thunkProfile.fail>;

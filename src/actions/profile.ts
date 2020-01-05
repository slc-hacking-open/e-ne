import { AxiosError } from "axios";
import * as ActionType from "./constants";
import { User } from "../services/models";

interface GetProfileParam {
  userid: string;
}

interface GetProfileResult {
  user: User;
}

export const getProfile = {
  start: (param: GetProfileParam) => ({
    type: ActionType.GET_PROFILE_START as typeof ActionType.GET_PROFILE_START,
    payload: param
  }),

  succeed: (param: GetProfileParam, result: GetProfileResult) => ({
    type: ActionType.GET_PROFILE_SUCCEED as typeof ActionType.GET_PROFILE_SUCCEED,
    payload: { param, result }
  }),

  fail: (param: GetProfileParam, error: AxiosError) => ({
    type: ActionType.GET_PROFILE_FAILURE as typeof ActionType.GET_PROFILE_FAILURE,
    payload: { param, error },
    error: true
  })
};

export type ProfileAction =
  | ReturnType<typeof getProfile.start>
  | ReturnType<typeof getProfile.succeed>
  | ReturnType<typeof getProfile.fail>;

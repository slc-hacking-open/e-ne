import { Reducer } from "redux";
import { AxiosError } from "axios";

import { ProfileAction } from "../actions/profile";
import * as ActionType from "../actions/constants";
import { User } from "../services/models";

export interface ProfileState {
  user: User;
  isLoading: boolean;
  error?: AxiosError | null;
}

export const initialState: ProfileState = {
  user: { timageurl: "", name: "", profile: "", userid: "" },
  isLoading: false
};

const profileReducer: Reducer<ProfileState, ProfileAction> = (
  state: ProfileState = initialState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case ActionType.GET_PROFILE_START:
      return {
        ...state,
        user: { timageurl: "", name: "", profile: "", userid: "" },
        isLoading: true
      };
    case ActionType.GET_PROFILE_SUCCEED:
      return {
        ...state,
        user: action.payload.result.user,
        isLoading: false
      };
    case ActionType.GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default profileReducer;

import { Reducer } from "redux";
import { AxiosError } from "axios";

import {
  PROFILE_FAILURE,
  PROFILE_START,
  PROFILE_SUCCEED,
  ProfileAction
} from "../actions/profile";
import { User } from "../services/models";

export interface ProfileState {
  user: User;
  isLoading: boolean;
  error?: AxiosError | null;
}

export const initialState: ProfileState = {
  user: { imageurl: "", name: "", profile: "", id: "", department: "" },
  isLoading: false
};

const thunkProfileReducer: Reducer<ProfileState, ProfileAction> = (
  state: ProfileState = initialState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case PROFILE_START:
      return {
        ...state,
        user: { imageurl: "", name: "", profile: "", id: "", department: "" },
        isLoading: true
      };
    case PROFILE_SUCCEED:
      return {
        ...state,
        user: action.payload.result.user,
        isLoading: false
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default thunkProfileReducer;

import { Reducer } from "redux";
import { AxiosError } from "axios";

import {
  THUNK_PROFILE_FAILURE,
  THUNK_PROFILE_START,
  THUNK_PROFILE_SUCCEED,
  ThunkProfileAction
} from "../actions/profile-thunk";
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

const thunkProfileReducer: Reducer<ProfileState, ThunkProfileAction> = (
  state: ProfileState = initialState,
  action: ThunkProfileAction
): ProfileState => {
  switch (action.type) {
    case THUNK_PROFILE_START:
      return {
        ...state,
        user: { timageurl: "", name: "", profile: "", userid: "" },
        isLoading: true
      };
    case THUNK_PROFILE_SUCCEED:
      return {
        ...state,
        user: action.payload.result.user,
        isLoading: false
      };
    case THUNK_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default thunkProfileReducer;

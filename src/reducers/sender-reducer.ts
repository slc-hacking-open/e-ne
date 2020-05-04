import { Reducer } from "redux";
import { User } from "../services/models";
import {
  SenderAction,
  CHANGE_CONTENTS,
  CHANGE_TO,
  CHANGE_COIN,
  GET_USERLIST,
  SUCCEED_USERLIST
} from "../actions/sender";

export interface SenderState {
  contents: string;
  to: string;
  coin: string;
  users: User[];
}

export const initialState: SenderState = {
  contents: "",
  to: "",
  coin: "",
  users: []
};

const SenderReducer: Reducer<SenderState, SenderAction> = (
  state: SenderState = initialState,
  action: SenderAction
): SenderState => {
  switch (action.type) {
    case CHANGE_CONTENTS:
      return {
        ...state,
        contents: action.payload.contents
      };
    case CHANGE_TO:
      return {
        ...state,
        to: action.payload.to
      };
    case CHANGE_COIN:
      return {
        ...state,
        coin: action.payload.coin
      };
    case GET_USERLIST:
      return {
        ...state,
        users: []
      };
    case SUCCEED_USERLIST:
      return {
        ...state,
        users: action.payload
      };
    default: {
      return state;
    }
  }
};

export default SenderReducer;

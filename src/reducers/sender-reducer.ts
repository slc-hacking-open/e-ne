import { Reducer } from "redux";
import {
  SenderAction,
  SUCCEED_NICE,
  CHANGE_CONTENTS,
  CHANGE_TO,
  CHANGE_COIN,
  CLEAR
} from "../actions/sender";

export interface SenderState {
  contents: string;
  to: string;
  coin: string;
}

export const initialState: SenderState = {
  contents: "",
  to: "",
  coin: ""
};

const SenderReducer: Reducer<SenderState, SenderAction> = (
  state: SenderState = initialState,
  action: SenderAction
): SenderState => {
  switch (action.type) {
    case SUCCEED_NICE:
      return state;
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
    case CLEAR:
      return {
        ...state,
        contents: "",
        to: "",
        coin: ""
      };
    default: {
      return state;
    }
  }
};

export default SenderReducer;

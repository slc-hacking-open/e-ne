import { Reducer } from 'redux'
import { User } from '../../services/models'
import {
  USERLIST_FAILURE,
  USERLIST_START,
  USERLIST_SUCCEED,
  SenderAction,
  CHANGE_CONTENTS,
  CHANGE_TO,
  CHANGE_COIN,
  CLEAR,
} from '../actions/sender'

export interface SenderState {
  contents: string
  to: string
  coin: string
  users: User[]
}

export const initialState: SenderState = {
  contents: '',
  to: '',
  coin: '',
  users: [],
}

const SenderReducer: Reducer<SenderState, SenderAction> = (
  state: SenderState = initialState,
  action: SenderAction
): SenderState => {
  switch (action.type) {
    case CHANGE_CONTENTS:
      return {
        ...state,
        contents: action.payload.contents,
      }
    case CHANGE_TO:
      return {
        ...state,
        to: action.payload.to,
      }
    case CHANGE_COIN:
      return {
        ...state,
        coin: action.payload.coin,
      }
    case CLEAR:
      return {
        ...state,
        contents: '',
        to: '',
        coin: '',
      }
    case USERLIST_START:
      return {
        ...state,
        users: [],
      }
    case USERLIST_SUCCEED:
      return {
        ...state,
        users: action.payload,
      }
    case USERLIST_FAILURE:
      return {
        ...state,
        users: [],
      }
    default: {
      return state
    }
  }
}

export default SenderReducer

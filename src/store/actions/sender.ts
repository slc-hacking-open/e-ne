import { Dispatch } from 'redux'
import { getUserList } from '../../services/users'
import { User } from '../../services/models'

export const CHANGE_CONTENTS = 'CHANGE_CONTENTS'
export const CHANGE_TO = 'CHANGE_TO'
export const CHANGE_COIN = 'CHANGE_COIN'
export const CLEAR = 'CLEAR'
export const USERLIST_START = 'USERLIST_START'
export const USERLIST_SUCCEED = 'USERLIST_SUCCEED'
export const USERLIST_FAILURE = 'USERLIST_FAILURE'

type ChangeContents = {
  type: typeof CHANGE_CONTENTS
  payload: {
    contents: string
  }
}

type ChangeTo = {
  type: typeof CHANGE_TO
  payload: {
    to: string
  }
}

type ChangeCoin = {
  type: typeof CHANGE_COIN
  payload: {
    coin: string
  }
}

type Clear = {
  type: typeof CLEAR
}

type UserListStart = {
  type: typeof USERLIST_START
}

type UserListSucceed = {
  type: typeof USERLIST_SUCCEED
  payload: User[]
}

type UserListFail = {
  type: typeof USERLIST_FAILURE
  payload: { message: string }
  error: true
}

export const Sender = {
  changeContents: (contents: string): ChangeContents => ({
    type: CHANGE_CONTENTS as typeof CHANGE_CONTENTS,
    payload: {
      contents,
    },
  }),
  changeTo: (to: string): ChangeTo => ({
    type: CHANGE_TO as typeof CHANGE_TO,
    payload: {
      to,
    },
  }),
  changeCoin: (coin: string): ChangeCoin => ({
    type: CHANGE_COIN as typeof CHANGE_COIN,
    payload: {
      coin,
    },
  }),
  clear: (): Clear => ({
    type: CLEAR as typeof CLEAR,
  }),
}

export const UserList = {
  start: (): UserListStart => ({
    type: USERLIST_START,
  }),

  succeed: (result: User[]): UserListSucceed => ({
    type: USERLIST_SUCCEED,
    payload: result,
  }),

  fail: (message: string): UserListFail => ({
    type: USERLIST_FAILURE,
    payload: { message },
    error: true,
  }),
}

export type SenderAction =
  | ChangeContents
  | ChangeTo
  | ChangeCoin
  | Clear
  | UserListStart
  | UserListSucceed
  | UserListFail

export const getUsers = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(UserList.start())
      const users = await getUserList()
      const result: User[] = users
      dispatch(UserList.succeed(result))
    } catch (error) {
      dispatch(UserList.fail('Server Error.'))
    }
  }
}

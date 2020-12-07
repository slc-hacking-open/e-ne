import thunk, { ThunkDispatch } from 'redux-thunk'

import { AnyAction } from 'redux'
import configureMockStore from 'redux-mock-store'
import {
  SenderAction,
  UserList,
  CHANGE_CONTENTS,
  Sender,
  CHANGE_TO,
  CHANGE_COIN,
  CLEAR,
  getUsers,
  USERLIST_START,
  USERLIST_SUCCEED,
  USERLIST_FAILURE,
} from './sender'
import { User } from '../../services/models'
import * as getUserList from '../../services/users'

describe('senderのアクションのテスト', () => {
  it('内容変更時のアクション', () => {
    const contents = 'contents'
    const expectedAction = {
      type: CHANGE_CONTENTS,
      payload: { contents },
    }
    expect(Sender.changeContents(contents)).toEqual(expectedAction)
  })

  it('宛先変更時のアクション', () => {
    const to = '山田太郎'
    const expectedAction = {
      type: CHANGE_TO,
      payload: { to },
    }
    expect(Sender.changeTo(to)).toEqual(expectedAction)
  })

  it('コイン変更時のアクション', () => {
    const coin = '100'
    const expectedAction = {
      type: CHANGE_COIN,
      payload: { coin },
    }
    expect(Sender.changeCoin(coin)).toEqual(expectedAction)
  })

  it('クリア時のアクション', () => {
    const expectedAction = {
      type: CLEAR,
    }
    expect(Sender.clear()).toEqual(expectedAction)
  })

  it('ユーザーリスト取得開始時のアクション', () => {
    const expectedAction = {
      type: USERLIST_START,
    }
    expect(UserList.start()).toEqual(expectedAction)
  })
  it('ユーザーリスト取得成功時のアクション', () => {
    const result: User[] = [
      {
        userid: 'user01',
        department: 'ソリューション部',
        name: '生保花子',
        profile: '趣味は園芸',
        imageurl: 'url',
      },
      {
        userid: 'user02',
        department: 'ソリューション２部',
        name: '生保太郎',
        profile: '趣味はプラモデル',
        imageurl: 'url2',
      },
    ]
    const expectedAction = {
      type: USERLIST_SUCCEED,
      payload: result,
    }
    expect(UserList.succeed(result)).toEqual(expectedAction)
  })
  it('ユーザーリスト取得失敗時のアクション', () => {
    const message = 'ServerError.'
    const expectedAction = {
      type: USERLIST_FAILURE,
      payload: { message },
      error: true,
    }
    expect(UserList.fail(message)).toEqual(expectedAction)
  })
})

describe('非同期アクション（ユーザーリスト取得）のテスト', () => {
  const middlewares = [thunk]
  type DispatchExts = ThunkDispatch<SenderAction, void, AnyAction>
  const mockStore = configureMockStore<SenderAction, DispatchExts>(middlewares)
  it('ユーザーリスト取得成功時に、ユーザーリスト取得開始および、ユーザーリスト取得成功のアクションが生成されること', () => {
    const result: User[] = [
      {
        userid: 'user01',
        department: 'ソリューション部',
        name: '生保花子',
        profile: '趣味は園芸',
        imageurl: 'url',
      },
      {
        userid: 'user02',
        department: 'ソリューション２部',
        name: '生保太郎',
        profile: '趣味はプラモデル',
        imageurl: 'url2',
      },
    ]
    const expectedActions = [
      { type: USERLIST_START },
      { type: USERLIST_SUCCEED, payload: result },
    ]

    const store = mockStore()
    const spy = jest
      .spyOn(getUserList, 'getUserList')
      .mockReturnValueOnce(Promise.resolve(result))

    return store.dispatch(getUsers()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith()
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('ユーザーリスト取得失敗時に、ユーザーリスト取得開始および、ユーザーリスト取得失敗のアクションが生成されること', () => {
    const message = 'Server Error.'
    const expectedActions = [
      { type: USERLIST_START },
      { type: USERLIST_SUCCEED, payload: { message }, error: true },
    ]

    const store = mockStore()
    const spy = jest
      .spyOn(getUserList, 'getUserList')
      .mockReturnValueOnce(Promise.reject(new Error()))

    return store.dispatch(getUsers()).catch(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith()
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

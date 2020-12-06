import { SenderAction } from '../actions/sender'
import SenderReducer, { initialState } from './sender-reducer'

describe('送信のレデューサーのテスト', () => {
  const testData = {
    contents: 'testContents',
    to: 'testTo',
    coin: '100',
    users: [
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
    ],
  }
  it('初期状態のテスト', () => {
    expect(SenderReducer(undefined, {} as SenderAction)).toEqual(initialState)
  })
  it('送信内容変更時に変更内容が設定されること', () => {
    const contents = 'contents'
    expect(
      SenderReducer(testData, {
        type: 'CHANGE_CONTENTS',
        payload: { contents },
      })
    ).toEqual({
      contents,
      to: testData.to,
      coin: testData.coin,
      users: testData.users,
    })
  })
  it('宛先変更時に宛先が設定されること', () => {
    const to = 'to'
    expect(
      SenderReducer(testData, {
        type: 'CHANGE_TO',
        payload: { to },
      })
    ).toEqual({
      contents: testData.contents,
      to,
      coin: testData.coin,
      users: testData.users,
    })
  })
  it('コイン変更時にコインが設定されること', () => {
    const coin = '500'
    expect(
      SenderReducer(testData, {
        type: 'CHANGE_COIN',
        payload: { coin },
      })
    ).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin,
      users: testData.users,
    })
  })

  it('クリア時にユーザーリスト以外の属性がクリアされること', () => {
    expect(
      SenderReducer(testData, {
        type: 'CLEAR',
      })
    ).toEqual({
      contents: '',
      to: '',
      coin: '',
      users: testData.users,
    })
  })
  it('ユーザーリスト取得開始時にユーザーリストがクリアされること', () => {
    expect(
      SenderReducer(testData, {
        type: 'USERLIST_START',
      })
    ).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin: testData.coin,
      users: [],
    })
  })
  it('ユーザーリスト取得成功時にユーザーリストに取得結果が設定されること', () => {
    const result = [
      {
        userid: 'user03',
        department: 'ソリューション３部',
        name: '生保次郎',
        profile: '趣味は映画鑑賞',
        imageurl: 'url3',
      },
    ]
    expect(
      SenderReducer(testData, {
        type: 'USERLIST_SUCCEED',
        payload: result,
      })
    ).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin: testData.coin,
      users: result,
    })
  })
  it('ユーザーリスト取得失敗時にユーザーリストがクリアされること', () => {
    expect(
      SenderReducer(testData, {
        type: 'USERLIST_FAILURE',
        payload: { message: 'serverError' },
        error: true,
      })
    ).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin: testData.coin,
      users: [],
    })
  })
})

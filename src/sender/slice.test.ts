import { AnyAction } from 'redux'
import { getUsers } from './asyncActions'
import senderSlice, {
  changeCoin,
  changeContents,
  changeTo,
  initialState,
  clear,
} from './slice'

describe('senderのレデューサーのテスト', () => {
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
        email: 'aaa@bbb',
      },
      {
        userid: 'user02',
        department: 'ソリューション２部',
        name: '生保太郎',
        profile: '趣味はプラモデル',
        imageurl: 'url2',
        email: 'ccc@ddd',
      },
    ],
  }
  it('初期状態のテスト', () => {
    expect(senderSlice(undefined, {} as AnyAction)).toEqual(initialState)
  })
  it('送信内容変更時に変更内容が設定されること', () => {
    const contents = 'contents'
    expect(senderSlice(testData, changeContents(contents))).toEqual({
      contents,
      to: testData.to,
      coin: testData.coin,
      users: testData.users,
    })
  })
  it('宛先変更時に宛先が設定されること', () => {
    const to = 'to'
    expect(senderSlice(testData, changeTo(to))).toEqual({
      contents: testData.contents,
      to,
      coin: testData.coin,
      users: testData.users,
    })
  })
  it('コイン変更時にコインが設定されること', () => {
    const coin = '500'
    expect(senderSlice(testData, changeCoin(coin))).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin,
      users: testData.users,
    })
  })

  it('クリア時にユーザーリスト以外の属性がクリアされること', () => {
    expect(senderSlice(testData, clear())).toEqual({
      contents: '',
      to: '',
      coin: '',
      users: testData.users,
    })
  })
  it('ユーザーリスト取得開始時にユーザーリストがクリアされること', () => {
    expect(senderSlice(testData, { type: getUsers.pending.type })).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin: testData.coin,
      users: [],
    })
  })
  it('ユーザーリスト取得成功時にユーザーリストに取得結果が設定されること', async () => {
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
      senderSlice(testData, { type: getUsers.fulfilled.type, payload: result })
    ).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin: testData.coin,
      users: result,
    })
  })
  it('ユーザーリスト取得失敗時にユーザーリストがクリアされること', () => {
    expect(senderSlice(testData, { type: getUsers.rejected.type })).toEqual({
      contents: testData.contents,
      to: testData.to,
      coin: testData.coin,
      users: [],
    })
  })
})

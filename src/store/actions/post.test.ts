import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { AnyAction } from 'redux'
import * as pushEmpathy from '../../services/posts'
import { EMPATHY_SUCCEED, EMPATHY, PostAction, empathy } from './post'

describe('postのアクションのテスト', () => {
  it('共感成功のアクション', () => {
    const result = true
    const expectedAction = {
      type: EMPATHY_SUCCEED,
      payload: { result },
    }
    expect(EMPATHY.succeed(result)).toEqual(expectedAction)
  })
})

describe('非同期アクション（共感数の更新）のテスト', () => {
  const middlewares = [thunk]
  type DispatchExts = ThunkDispatch<PostAction, void, AnyAction>
  const mockStore = configureMockStore<PostAction, DispatchExts>(middlewares)
  const userId = 'user01'
  const postId = 'post01'
  it('共感数の更新成功時に、共感数更新成功のアクションが生成されること', () => {
    const result = true
    const expectedAction = [
      {
        type: EMPATHY_SUCCEED,
        payload: { result },
      },
    ]
    const store = mockStore()
    const spy = jest
      .spyOn(pushEmpathy, 'pushEmpathy')
      .mockReturnValueOnce(Promise.resolve(result))

    return store.dispatch(empathy(userId, postId)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(userId, postId)
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})

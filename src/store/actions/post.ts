import { Dispatch } from 'redux'
import { pushEmpathy } from '../../services/posts'

// 共感
// note: 共感ボタン押した時にローディングやエラーメッセージ出すのは
// UX悪い気がするので、一旦succeedアクションしか作ってない
// TODO: yoshikoshi 共感ボタン押下時のエラー処理方式の検討
export const EMPATHY_SUCCEED = 'EMPATHY_SUCCEED'

type Succeed = {
  type: typeof EMPATHY_SUCCEED
  payload: {
    result: boolean
  }
}

export const EMPATHY = {
  succeed: (result: boolean): Succeed => ({
    type: EMPATHY_SUCCEED as typeof EMPATHY_SUCCEED,
    payload: {
      result,
    },
  }),
}

export const empathy = (userId: string, postId: string) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const result = await pushEmpathy(userId, postId)
      dispatch(EMPATHY.succeed(result))
    } catch (error) {
      console.log('Server Error')
      console.log(error)
    }
  }
}

export type PostAction = Succeed

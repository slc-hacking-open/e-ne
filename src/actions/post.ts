import { Dispatch } from "redux";
import { pushEmpathy } from "../services/posts";

export const CLICK_EMPATHY = "CLICK_EMPATHY";
export const ADD = "ADD";

// async acitons
// note: 共感ボタン押した時にローディングやエラーメッセージ出すのは
// UX悪い気がするので、一旦succeedアクションしか作ってない
export const SUCCEED_EMPATHY = "SUCCEED_EMPATHY";

export const succeedEmpathy = (result: boolean) => ({
  type: SUCCEED_EMPATHY as typeof SUCCEED_EMPATHY,
  payload: {
    result
  }
});

export const empathy = (userId: string, postId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("empathy");
      const result = await pushEmpathy(userId, postId);
      dispatch(succeedEmpathy(result));
      console.log(result);
    } catch (error) {
      console.log("Server Error");
      console.log(error);
    }
  };
};

export const add = (contents: string, from: string, to: string) => ({
  type: ADD as typeof ADD,
  payload: {
    contents,
    from,
    to
  }
});

export type PostAction =
  | ReturnType<typeof succeedEmpathy>
  | ReturnType<typeof add>;

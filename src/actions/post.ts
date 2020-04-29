import { Dispatch } from "redux";

export const CLICK_EMPATHY = "CLICK_EMPATHY";

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
      // const result = await pushEmpathy(userId, postId);
      const result = true;
      dispatch(succeedEmpathy(result));
      console.log(result);
    } catch (error) {
      console.log("Server Error");
      console.log(error);
    }
  };
};

export type PostAction = ReturnType<typeof succeedEmpathy>;

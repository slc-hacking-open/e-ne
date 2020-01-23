import { Dispatch } from "redux";
import { pushEmpathy } from "../services/posts";

export const CLICK_EMPATHY = "CLICK_EMPATHY";

// async acitons
// note: 共感ボタン押した時にローディングやエラーメッセージ出すのは
// UX悪い気がするので、一旦succeedアクションしか作ってない
export const SUCCEED_EMPATHY = "SUCCEED_EMPATHY";

// TODO: Rename to addEmpathyCount(ボタン押下後すぐ、API結果に関わらず、いいね数増加させたいためのアクションのため)
// API結果無視するのは、タイムライン上のいいね総数がに正確性や即時性はいらないとおもうから
export const clickEmpathy = () => ({
  type: CLICK_EMPATHY as typeof CLICK_EMPATHY
});

export const succeedEmpathy = (result: boolean) => ({
  type: SUCCEED_EMPATHY as typeof SUCCEED_EMPATHY,
  payload: {
    result
  }
});

export const empathy = (userId: string, postId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const result = await pushEmpathy(userId, postId);
      dispatch(succeedEmpathy(result));
      console.log(result);
    } catch (error) {
      console.log("Server Error");
      console.log(error);
    }
  };
};

export type PostAction =
  | ReturnType<typeof clickEmpathy>
  | ReturnType<typeof succeedEmpathy>;

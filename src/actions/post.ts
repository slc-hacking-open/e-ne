import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducer";

export const EMPATHY = "EMPATHY";

export const empathy = (response: any) => ({
  type: EMPATHY as typeof EMPATHY,
  payload: {
    response
  }
});

export const pushEmpathy = (
  id: number
): ThunkAction<void, AppState, undefined, PostAction> => (
  dispatch: Dispatch<Action>
) => {
  fetch("localhost:3030/empathy")
    .then(res => {
      console.log(res);
      dispatch(empathy(res));
    })
    .catch(reason => {});
};

export type PostAction = ReturnType<typeof empathy>;

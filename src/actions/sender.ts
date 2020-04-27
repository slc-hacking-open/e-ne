import { Dispatch } from "redux";
import { pushNice } from "../services/posts";
import { getUserList } from "../services/users";

export const CHANGE_CONTENTS = "CHANGE_CONTENTS";
export const CHANGE_TO = "CHANGE_TO";
export const CHANGE_COIN = "CHANGE_COIN";
export const CLEAR = "CLEAR";
export const CLICK_NICE = "CLICK_NICE";
export const SUCCEED_NICE = "SUCCEED_NICE";
export const GET_USERLIST = "GET_USERLIST";
export const SUCCEED_USERLIST = "SUCCEED_USERLIST";

export const clickNice = () => ({
  type: CLICK_NICE as typeof CLICK_NICE
});

export const succeedNice = (result: boolean) => ({
  type: SUCCEED_NICE as typeof SUCCEED_NICE,
  payload: {
    result
  }
});

export const changeContents = (contents: string) => ({
  type: CHANGE_CONTENTS as typeof CHANGE_CONTENTS,
  payload: {
    contents
  }
});

export const changeTo = (to: string) => ({
  type: CHANGE_TO as typeof CHANGE_TO,
  payload: {
    to
  }
});

export const changeCoin = (coin: string) => ({
  type: CHANGE_COIN as typeof CHANGE_COIN,
  payload: {
    coin
  }
});

export const clear = () => ({
  type: CLEAR as typeof CLEAR
});

export const nice = (
  senderId: string,
  receiverId: string,
  contents: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      const result = await pushNice(senderId, receiverId, contents);
      dispatch(succeedNice(result));
      console.log(result);
    } catch (error) {
      console.log("Server Error");
      console.log(error);
    }
  };
};

export const UserList = {
  start: () => ({
    type: GET_USERLIST as typeof GET_USERLIST
  }),

  succeed: (result: []) => ({
    type: SUCCEED_USERLIST as typeof SUCCEED_USERLIST,
    payload: result
  })
};

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(UserList.start());
      const users = await getUserList();
      const result: [] = users;
      dispatch(UserList.succeed(result));
    } catch (error) {
      console.log("Server Error.");
    }
  };
};

export type SenderAction =
  | ReturnType<typeof changeContents>
  | ReturnType<typeof changeTo>
  | ReturnType<typeof changeCoin>
  | ReturnType<typeof clickNice>
  | ReturnType<typeof succeedNice>
  | ReturnType<typeof clear>
  | ReturnType<typeof UserList.start>
  | ReturnType<typeof UserList.succeed>;

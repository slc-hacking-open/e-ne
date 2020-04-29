import { Dispatch } from "redux";
import { postPost } from "../services/posts";
import { getUserList } from "../services/users";
import { MyOption } from "../services/models";

export const CHANGE_CONTENTS = "CHANGE_CONTENTS";
export const CHANGE_TO = "CHANGE_TO";
export const CHANGE_COIN = "CHANGE_COIN";
export const CLEAR = "CLEAR";
export const POST_ENE = "POST_ENE";
export const SUCCEED_POST = "SUCCEED_POST";
export const GET_USERLIST = "GET_USERLIST";
export const SUCCEED_USERLIST = "SUCCEED_USERLIST";

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

export const Ene = {
  start: () => ({
    type: POST_ENE as typeof POST_ENE
  }),

  succeed: (result: boolean) => ({
    type: SUCCEED_POST as typeof SUCCEED_POST,
    payload: result
  })
};

export const sendEne = (
  senderId: string,
  receiverId: string,
  contents: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(Ene.start());
      const result = await postPost(senderId, receiverId, contents);
      dispatch(Ene.succeed(result));
    } catch (error) {
      console.log("Server Error.");
    }
  };
};

export const UserList = {
  start: () => ({
    type: GET_USERLIST as typeof GET_USERLIST
  }),

  succeed: (result: MyOption[]) => ({
    type: SUCCEED_USERLIST as typeof SUCCEED_USERLIST,
    payload: result
  })
};

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(UserList.start());
      const users = await getUserList();
      const result: MyOption[] = users;
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
  | ReturnType<typeof Ene.start>
  | ReturnType<typeof Ene.succeed>
  | ReturnType<typeof clear>
  | ReturnType<typeof UserList.start>
  | ReturnType<typeof UserList.succeed>;

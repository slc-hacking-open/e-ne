export const CHANGE_CONTENTS = "CHANGE_CONTENTS";
export const CHANGE_TO = "CHANGE_TO";
export const CHANGE_COIN = "CHANGE_COIN";
export const CLEAR = "CLEAR";

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

export type SenderAction =
  | ReturnType<typeof changeContents>
  | ReturnType<typeof changeTo>
  | ReturnType<typeof changeCoin>
  | ReturnType<typeof clear>;

export const SEND = "SEND";
export const CHANGE_CONTENTS = "CHANGE_CONTENTS";
export const CHANGE_TO = "CHANGE_TO";

export const send = (contents: string, from: string, to: string) => ({
  type: SEND as typeof SEND,
  payload: {
    contents,
    from,
    to
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

export type PostFormAction =
  | ReturnType<typeof send>
  | ReturnType<typeof changeContents>
  | ReturnType<typeof changeTo>;

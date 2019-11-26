export const CHANGE_CONTENTS = "CHANGE_CONTENTS";
export const CHANGE_TO = "CHANGE_TO";
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

export const clear = () => ({
  type: CLEAR as typeof CLEAR
});

export type PostFormAction =
  | ReturnType<typeof changeContents>
  | ReturnType<typeof changeTo>
  | ReturnType<typeof clear>;

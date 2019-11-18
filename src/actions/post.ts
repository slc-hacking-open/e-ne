export const EMPATHY = "EMPATHY";
export const SEND = "SEND";

export const empathy = () => ({
  type: EMPATHY as typeof EMPATHY,
});

export const send = (contents: string, from: string, to: string) => ({
  type: SEND as typeof SEND,
  payload: {
    contents,
    from,
    to,
  },
});

export type PostAction = ReturnType<typeof empathy> | ReturnType<typeof send>;

export const ADD = "ADD";

export const add = (contents: string, from: string, to: string) => ({
  type: ADD as typeof ADD,
  payload: {
    contents,
    from,
    to
  }
});

export type PostsAction = ReturnType<typeof add>;

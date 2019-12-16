export const EMPATHY = "EMPATHY";

export const empathy = () => ({
  type: EMPATHY as typeof EMPATHY,
  payload: {}
});

export type PostsAction = ReturnType<typeof empathy>;

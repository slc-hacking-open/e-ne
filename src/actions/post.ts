export const EMPATHY = "EMPATHY";

export const empathy = () => ({
  type: EMPATHY as typeof EMPATHY,
});

export type PostAction = ReturnType<typeof empathy>;

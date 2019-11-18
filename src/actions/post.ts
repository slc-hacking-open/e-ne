export const GOOD = "GOOD";

export const good = () => ({
  type: GOOD as typeof GOOD,
});

export type PostAction = ReturnType<typeof good>;

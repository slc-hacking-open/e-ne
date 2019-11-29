export const UNDO = "UNDO";

export const undo = () => ({
  type: UNDO as typeof UNDO
});

export type UndoAction = ReturnType<typeof undo>;

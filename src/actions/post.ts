export const EMPATHY = "EMPATHY";

/*
export const empathy = (id: number) => ({
  type: EMPATHY as typeof EMPATHY,
  payload: {
    id
  }
});
*/

export const empathy = (id: number) => {
  console.log("empathy id:", id);

  return {
    type: EMPATHY as typeof EMPATHY,
    payload: {
      id
    }
  };
};

export type PostAction = ReturnType<typeof empathy>;

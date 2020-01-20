export const fetchPosts = (userId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 0,
          from: userId,
          to: 902,
          contents: "こんにちは"
        },
        {
          id: 1,
          from: 903,
          to: userId,
          contents: "こんばんは"
        }
      ]);
    }, 1000);
  });
};

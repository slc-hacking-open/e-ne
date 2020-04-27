import { Timeline, APIPost, User } from "./models";

export const apiPosts2Timeline = (apiPosts: APIPost[]): Timeline => {
  return {
    pageNumber: 1,
    pageSize: 1,
    posts: apiPosts.map(apiPost => {
      return {
        id: apiPost.id,
        sender: {
          id: "",
          department: "",
          name: apiPost.sender.name.S,
          profile: "",
          imageurl: apiPost.sender.imageurl.S
        },
        receiver: {
          id: "",
          department: "",
          name: apiPost.reciever.name.S,
          profile: "",
          imageurl: apiPost.reciever.imageurl.S
        },
        contents: apiPost.contents,
        datetime: apiPost.datetime,
        empathyCount: apiPost.empathyCount
      };
    })
  };
};

export const apiUsers2SelectUser = (apiUsers: User[]): [] => {
  const array: any = [];

  apiUsers.map(apiUser =>
    array.push({ value: apiUser.id, label: apiUser.name })
  );

  return array;
};

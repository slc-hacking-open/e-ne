import { Timeline, APIPost, Post } from './models'

export const apiPosts2Timeline = (
  apiPosts: APIPost[],
  userid: string
): Timeline => {
  return {
    pageNumber: 1,
    pageSize: 1,
    posts: apiPosts.map((apiPost) => {
      return {
        id: apiPost.id,
        sender: {
          userid: '',
          department: '',
          name: apiPost.sender[0].name,
          profile: '',
          imageurl: apiPost.sender[0].imageurl,
        },
        receiver: {
          userid: '',
          department: '',
          name: apiPost.reciever[0].name,
          profile: '',
          imageurl: apiPost.reciever[0].imageurl,
        },
        contents: apiPost.contents,
        datetime: apiPost.datetime,
        empathyCount: apiPost.empathyUserIds.length,
        hasEmpathized: apiPost.empathyUserIds.includes(userid),
      }
    }),
  }
}

export const apiPost2Post = (apiPost: APIPost, userid: string): Post => {
  return {
    id: apiPost.id,
    sender: {
      userid: '',
      department: '',
      name: apiPost.sender[0].name,
      profile: '',
      imageurl: apiPost.sender[0].imageurl,
    },
    receiver: {
      userid: '',
      department: '',
      name: apiPost.reciever[0].name,
      profile: '',
      imageurl: apiPost.reciever[0].imageurl,
    },
    contents: apiPost.contents,
    datetime: apiPost.datetime,
    empathyCount: apiPost.empathyUserIds.length,
    hasEmpathized: apiPost.empathyUserIds.includes(userid),
  }
}

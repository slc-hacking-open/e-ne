import { Timeline, APIPost, Post } from './models'

export const apiPosts2Timeline = (apiPosts: APIPost[]): Timeline => {
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
          email: apiPost.sender[0].email,
        },
        receiver: {
          userid: '',
          department: '',
          name: apiPost.reciever[0].name,
          profile: '',
          imageurl: apiPost.reciever[0].imageurl,
          email: apiPost.reciever[0].email,
        },
        contents: apiPost.contents,
        datetime: apiPost.datetime,
        empathyCount: apiPost.empathyCount,
        hasEmpathized: apiPost.hasEmpathized,
      }
    }),
  }
}

export const apiPost2Post = (apiPost: APIPost): Post => {
  return {
    id: apiPost.id,
    sender: {
      userid: '',
      department: '',
      name: apiPost.sender[0].name,
      profile: '',
      imageurl: apiPost.sender[0].imageurl,
      email: apiPost.sender[0].email,
    },
    receiver: {
      userid: '',
      department: '',
      name: apiPost.reciever[0].name,
      profile: '',
      imageurl: apiPost.reciever[0].imageurl,
      email: apiPost.reciever[0].email,
    },
    contents: apiPost.contents,
    datetime: apiPost.datetime,
    empathyCount: apiPost.empathyCount,
    hasEmpathized: apiPost.hasEmpathized,
  }
}

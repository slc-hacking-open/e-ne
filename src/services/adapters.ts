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
          name: apiPost.sender.name,
          profile: '',
          imageurl: apiPost.sender.imageurl,
          enecoin: 0,
          glicocoin: 0,
        },
        receiver: {
          userid: '',
          department: '',
          name: apiPost.receiver.name,
          profile: '',
          imageurl: apiPost.receiver.imageurl,
          enecoin: 0,
          glicocoin: 0,
        },
        contents: apiPost.contents,
        datetime: apiPost.datetime,
        empathyUsers: apiPost.empathyUsers,
        empathyCount: apiPost.empathyUsers.length,
        hasEmpathized: !!apiPost.empathyUsers.find(
          (user) => user.userid === userid
        ),
        amount: apiPost.amount,
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
      name: apiPost.sender.name,
      profile: '',
      imageurl: apiPost.sender.imageurl,
      enecoin: 0,
      glicocoin: 0,
    },
    receiver: {
      userid: '',
      department: '',
      name: apiPost.receiver.name,
      profile: '',
      imageurl: apiPost.receiver.imageurl,
      enecoin: 0,
      glicocoin: 0,
    },
    contents: apiPost.contents,
    datetime: apiPost.datetime,
    empathyUsers: apiPost.empathyUsers,
    empathyCount: apiPost.empathyUsers.length,
    hasEmpathized: !!apiPost.empathyUsers.find(
      (user) => user.userid === userid
    ),
    amount: apiPost.amount,
  }
}

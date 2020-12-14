import { Timeline, APIPost, Post } from './models'

export const apiPosts2Timeline = (apiPosts: APIPost[]): Timeline => {
  return {
    pageNumber: 1,
    pageSize: 1,
    posts: apiPosts.map((apiPost) => {
      return {
        department: apiPost.department.S,
        id: apiPost.id.N,
        sender: {
          userid: '',
          department: '',
          name: apiPost.sender.name.S,
          profile: '',
          imageurl: apiPost.sender.imageurl.S,
        },
        receiver: {
          userid: '',
          department: '',
          name: apiPost.reciever.name.S,
          profile: '',
          imageurl: apiPost.reciever.imageurl.S,
        },
        contents: apiPost.contents.S,
        datetime: apiPost.datetime.S,
        empathyCount: apiPost.empathyCount.N,
        hasEmpathized: apiPost.hasEmpathized,
      }
    }),
  }
}

export const apiPost2Post = (apiPost: APIPost): Post => {
  return {
    department: apiPost.department.S,
    id: apiPost.id.N,
    sender: {
      userid: '',
      department: '',
      name: apiPost.sender.name.S,
      profile: '',
      imageurl: apiPost.sender.imageurl.S,
    },
    receiver: {
      userid: '',
      department: '',
      name: apiPost.reciever.name.S,
      profile: '',
      imageurl: apiPost.reciever.imageurl.S,
    },
    contents: apiPost.contents.S,
    datetime: apiPost.datetime.S,
    empathyCount: apiPost.empathyCount.N,
    hasEmpathized: apiPost.hasEmpathized,
  }
}

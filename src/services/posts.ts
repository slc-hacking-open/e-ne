import axios from 'axios'
import { Auth } from 'aws-amplify'
import { BASE_URL_POSTS, TIMEOUT } from './config'
import { Timeline, Post } from './models'
import { apiPosts2Timeline, apiPost2Post } from './adapters'

const postsConfig = {
  baseURL: `${BASE_URL_POSTS}`,
  timeout: TIMEOUT,
}

// タイムライン取得
export const getTimeline = async (
  userid: string,
  senderId?: string,
  receiverId?: string
): Promise<Timeline> => {
  const instance = axios.create(postsConfig)
  const response = await instance.get(``, {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
    params: {
      senderId,
      receiverId,
    },
  })

  switch (response.status) {
    case 200:
      break
    case 400:
    case 404:
      throw new Error('タイムラインが取得できませんでした')
    default:
      throw new Error('サーバーエラーです')
  }

  const timeline: Timeline = apiPosts2Timeline(response.data.data, userid)

  return timeline
}

// いいね投稿
export const postPost = async (
  senderId: string,
  receiverId: string,
  contents: string
): Promise<Post> => {
  const instance = axios.create(postsConfig)
  const response = await instance.post(
    ``,
    `{
    "data": {
      "senderid": "${senderId}",
      "receiverid": "${receiverId}",
      "contents": "${contents}"
    }
  }`,
    {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    }
  )

  switch (response.status) {
    case 200:
      break
    case 400:
    case 404:
      throw new Error('いいねの投稿が失敗しました')
    default:
      throw new Error('サーバーエラーです')
  }

  const newPost: Post = apiPost2Post(response.data.data, senderId)

  return newPost
}

// 共感ボタン押下時
export const pushEmpathy = async (
  cardid: string,
  empathizerid: string
): Promise<boolean> => {
  const instance = axios.create(postsConfig)
  const response = await instance.post(
    `/${cardid}`,
    `{
    "data":{
      "empathizerid":"${empathizerid}"
    }
  }`,
    {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    }
  )

  if (response.status !== 200) {
    switch (response.status) {
      case 400:
      case 405:
        throw new Error('共感に失敗しました')
      default:
        throw new Error('サーバーエラーです')
    }
  }

  return response.data.data
}

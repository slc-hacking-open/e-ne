import { Auth } from 'aws-amplify'
import axios from 'axios'
import { BASE_URL_USER, TIMEOUT } from './config'
import { User } from './models'

const usersConfig = {
  baseURL: `${BASE_URL_USER}`,
  timeout: TIMEOUT,
}

export const getUserProfile = async (userId: string): Promise<User> => {
  const instance = axios.create(usersConfig)
  const response = await instance.get(`/${userId}`, {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  })

  switch (response.status) {
    case 200:
      break
    case 400:
    case 404:
      throw new Error('ユーザ情報が取得できませんでした')
    default:
      throw new Error('サーバーエラーです')
  }

  const user: User = response.data.data[0]

  return user
}

export const getUserList = async (): Promise<User[]> => {
  const instance = axios.create(usersConfig)
  const response = await instance.get(``, {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  })

  switch (response.status) {
    case 200:
      break
    case 400:
    case 404:
      throw new Error('ユーザ情報が取得できませんでした')
    default:
      throw new Error('サーバーエラーです')
  }

  const users: User[] = response.data.data

  return users
}

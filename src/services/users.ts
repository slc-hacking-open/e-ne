import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

const usersConfig = {
  baseURL: `${BASE_URL}/users`,
  timeout: TIMEOUT
};

export const getProfile = async (userId: string) => {
  const instance = axios.create(usersConfig);
  const response = await instance.get(`/${userId}`);

  switch (response.status) {
    case 200:
      return response.data;
    case 400:
    case 404:
      throw new Error("ユーザ情報が取得できませんでした");
    default:
      throw new Error("サーバーエラーです");
  }
};

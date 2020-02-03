import axios from "axios";
import { BASE_URL_USER, TIMEOUT } from "./config";

const usersConfig = {
  baseURL: `${BASE_URL_USER}`,
  timeout: TIMEOUT
};

export const getUserProfile = async (userId: string) => {
  const instance = axios.create(usersConfig);
  const response = await instance.get(`?userid=${userId}`);

  switch (response.status) {
    case 200:
      return response.data.data;
    case 400:
    case 404:
      throw new Error("ユーザ情報が取得できませんでした");
    default:
      throw new Error("サーバーエラーです");
  }
};

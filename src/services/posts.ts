import axios from "axios";
import { BASE_URL_POSTS, TIMEOUT } from "./config";
import { Timeline } from "./models";
import { apiPosts2Timeline } from "./adapters";

const postsConfig = {
  baseURL: `${BASE_URL_POSTS}`,
  timeout: TIMEOUT
};

// タイムライン取得
export const getTimeline = async (department: string): Promise<Timeline> => {
  const instance = axios.create(postsConfig);
  const response = await instance.get(``, {
    params: {
      department
    }
  });

  switch (response.status) {
    case 200:
      break;
    case 400:
    case 404:
      throw new Error("タイムラインが取得できませんでした");
    default:
      throw new Error("サーバーエラーです");
  }

  const timeline: Timeline = apiPosts2Timeline(response.data.data);

  return timeline;
};

// いいね投稿
export const postPost = async (contents: string): Promise<boolean> => {
  const instance = axios.create(postsConfig);
  const response = await instance.post(``, {
    data: {
      department: "SLC／生保ソリューション第２部",
      sender: "111111",
      reciever: "222222",
      contents: "hello"
    }
  });
  console.log(response);

  switch (response.status) {
    case 200:
      return true;
    case 400:
    case 404:
      throw new Error("タイムラインが取得できませんでした");
    default:
      throw new Error("サーバーエラーです");
  }
};

// いいねボタン押下時
export const pushNice = async (
  senderId: string,
  receiverId: string,
  contents: string
): Promise<boolean> => {
  // TODO: booleanでいいのか？？？
  const body = {
    senderId,
    receiverId,
    contents
  };
  const instance = axios.create(postsConfig);
  const response = await instance.post(``, body);
  console.log(response);

  if (response.status !== 200) {
    switch (response.status) {
      case 400:
      case 405:
        throw new Error("いいねの投稿が完了していません");
      default:
        throw new Error("サーバーエラーです");
    }
  }

  return true;
};

import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";
import { Post } from "../models";

const postsConfig = {
  baseURL: `${BASE_URL}/posts`,
  timeout: TIMEOUT
};

export const getTimeline = async (
  userId: string,
  pageNumber: number
): Promise<Post[]> => {
  const instance = axios.create(postsConfig);
  const response = await instance.get(`/${userId}/${pageNumber}`);

  if (response.status === 200) {
    const posts: Post[] = [...response.data.posts];
    console.log("status 200");
    console.log(posts);

    return posts;
  }

  switch (response.status) {
    case 400:
    case 404:
      throw new Error("タイムラインが取得できませんでした");
    default:
      throw new Error("サーバーエラーです");
  }
};

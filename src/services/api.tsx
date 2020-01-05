import axios from "axios";

import { User } from "./models";

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: "https://4bi76rbetj.execute-api.ap-northeast-1.amazonaws.com/Prod",
  timeout: 7000
};

export const getProfileFactory = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig
  };
  const instance = axios.create(config);

  const getProfile = async (userid: string) => {
    const response = await instance.get(`/enedbfunc?userid=${userid}`);

    if (response.status !== 200) {
      throw new Error("Server Error");
    }
    const user: User = response.data.data;

    return user;
  };

  return getProfile;
};

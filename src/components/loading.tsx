import React, { FC } from "react";
import "./loading.css";

export interface LoadingProps {
  isLoading?: boolean;
}

const Loading: FC<LoadingProps> = ({ isLoading = false }) => (
  <div className="loading">
    {isLoading ? (
      <img alt="ローディング中・・・" src="/loading.gif" />
    ) : (
      <span />
    )}
  </div>
);

export default Loading;

import React, { FC } from "react";
import "./post.css";

export interface PostProps {
  id?: number;
  contents?: string;
  from?: string;
  to?: string;
}

const debugNow = (): string => {
  const d = new Date();
  return ("" +  (d.getMonth() + 1) + "月" + d.getDate() + "日 " + d.getHours() + ":" + d.getMinutes());
}

const Post: FC<PostProps> = ({ id = 0, contents = "", from = "", to = "" }) => (
  <div className="post">
    <div className="post-thumbnail">
      <img className="post-thumbnail-img" src="/human.png" alt="いいねした人" />
      <p>{from}</p>
    </div>
    <div className="post-contents">
      <p className="post-contents-p">{contents}</p>
    </div>
    <div className="post-thumbnail">
      <img
        className="post-thumbnail-img"
        src="/human.png"
        alt="いいねされた人"
      />
      <p>{to}</p>
    </div>
    <div className="post-time">
      <p>{debugNow()}</p>
    </div>
  </div>
);

export default Post;

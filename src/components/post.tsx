import React, { FC } from "react";
import "./post.css";

export interface PostProps {
  id?: string;
  sender?: {
    id?: string;
    name?: string;
    department?: string;
    photoURL?: string;
  };
  receiver?: {
    id?: string;
    name?: string;
    department?: string;
    photoURL?: string;
  };
  contents?: string;
  datetime?: string;
  empathyCount?: number;
}

const Post: FC<PostProps> = ({
  id = "0",
  sender = { name: "" },
  receiver = { name: "" },
  contents = "",
  datetime = "",
  empathyCount = 0
}) => (
  <div className="post">
    <div className="post-thumbnail">
      <img className="post-thumbnail-img" src="/human.png" alt="いいねした人" />
      <p>{sender.name}</p>
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
      <p>{receiver.name}</p>
    </div>
    <div className="post-time">
      <p>{datetime}</p>
    </div>
    <div className="post-empathy">
      <p>いいね数: {empathyCount}</p>
    </div>
  </div>
);

export default Post;

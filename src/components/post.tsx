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
  empathy?: (userId: string, postId: string) => void;
}

const Post: FC<PostProps> = ({
  id = "0",
  sender = { name: "" },
  receiver = { name: "" },
  contents = "",
  datetime = "",
  empathyCount = 0,
  empathy = () => {}
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
      <button
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onClick={e => {
          // TODO: userId
          empathy("0001", id);
        }}
      >
        共感
      </button>
      <span>{empathyCount}</span>
    </div>
  </div>
);

export default Post;

import React, { FC } from "react";
import "./post.css";

export interface PostProps {
  id?: number;
  contents?: string;
  from?: string;
  to?: string;
  empathy?: () => void;
}

const Post: FC<PostProps> = ({
  id = 0,
  contents = "",
  from = "",
  to = "",
  empathy = () => {}
}) => (
  <div className="post">
    <div className="post-thumbnail">
      <img className="post-thumbnail-img" src="./null.png" alt="いいねした人" />
      <p>{from}</p>
    </div>
    <div className="post-contents">
      <p className="post-contents-p">{contents}</p>
    </div>
    <div className="post-thumbnail">
      <img
        className="post-thumbnail-img"
        src="./null.png"
        alt="いいねされた人"
      />
      <p>{to}</p>
    </div>
    <div className="post-empathy">
      <button type="button" className="post-empathy-button" onClick={empathy}>
        共感
      </button>
    </div>
  </div>
);

export default Post;

import React, { FC } from "react";
import "./post.css";

export interface PostProps {
  contents?: string;
  from?: string;
  to?: string;
  empathy?: () => void;
}

const Post: FC<PostProps> = ({
  contents = "",
  from = "",
  to = "",
  empathy = () => {}
}) => (
  <div className="post">
    <ul>
      <li className="post-contents">
        <p>{contents}</p>
      </li>
      <li className="post-fromto">
        <p>
          {from} -> {to}
        </p>
      </li>
    </ul>
    <button type="button" onClick={empathy}>
      共感
    </button>
  </div>
);

export default Post;

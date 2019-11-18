import React, { FC } from "react";

export interface PostProps {
  contents?: string;
  from?: string;
  to?: string;
  good?: () => void;
}

const Post: FC<PostProps> = ({
  contents = "",
  from = "",
  to = "",
  good = () => {},
}) => (
  <>
    <ul>
      <li>
        <p>{contents}</p>
      </li>
      <li>
        <p>FROM:{from}</p>
      </li>
      <li>
        <p>TO:{to}</p>
      </li>
    </ul>
    <button type="button" onClick={good}>
      eね！
    </button>
  </>
);

export default Post;

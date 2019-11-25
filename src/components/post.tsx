import React, { FC } from "react";

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
  <>
    <ul className="post">
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
    <button type="button" onClick={empathy}>
      共感
    </button>
  </>
);

export default Post;

import React, { FC } from "react";

export interface PostProps {
  contents?: string;
  from?: string;
  to?: string;
  empathy?: () => void;
  send?: (contents: string, from: string, to: string) => void;
}

const Post: FC<PostProps> = ({
  contents = "",
  from = "",
  to = "",
  empathy = () => {},
  send = () => {},
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
    <button type="button" onClick={empathy}>
      共感
    </button>
    <button
      type="button"
      onClick={() => send("新しい投稿ですよ", "Aさん", "Bさん")}
    >
      新規投稿
    </button>
  </>
);

export default Post;

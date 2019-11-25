import React, { FC } from "react";

export interface PostFormProps {
  contents?: string;
  to?: string;
  changeContents?: (contents: string) => void;
  changeTo?: (to: string) => void;
  send?: () => void;
}

const PostForm: FC<PostFormProps> = ({
  contents = "",
  to = "",
  changeContents = () => {},
  changeTo = () => {},
  send = () => {}
}) => (
  <div id="post-form">
    <h1>Post Form</h1>
    <input
      name="to"
      value={to}
      placeholder="宛先"
      onChange={e => {
        changeTo(e.target.value);
      }}
    />
    <input
      name="contents"
      value={contents}
      placeholder="内容"
      onChange={e => {
        changeContents(e.target.value);
      }}
    />
    <button type="button" onClick={send}>
      いいね！
    </button>
  </div>
);

export default PostForm;

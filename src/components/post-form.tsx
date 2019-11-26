import React, { FC } from "react";
import "./post-form.css";
import { NONAME } from "dns";

export interface PostFormProps {
  contents?: string;
  to?: string;
  changeContents?: (contents: string) => void;
  changeTo?: (to: string) => void;
  send?: (contents: string, from: string, to: string) => void;
}

const PostForm: FC<PostFormProps> = ({
  contents = "",
  to = "",
  changeContents = () => {},
  changeTo = () => {},
  send = () => {}
}) => (
  <div id="post-form">
    <input
      className="post-form-to"
      name="to"
      value={to}
      placeholder="宛先"
      onChange={e => {
        changeTo(e.target.value);
      }}
    />
    <textarea
      className="post-form-contents"
      name="contents"
      value={contents}
      placeholder="内容"
      onChange={e => {
        changeContents(e.target.value);
      }}
    />
    <button
      type="button"
      onClick={e => {
        if (contents !== "" && to !== "") send(contents, "私", to);
      }}
    >
      いいね！
    </button>
  </div>
);

export default PostForm;

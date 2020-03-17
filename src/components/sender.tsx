import React, { FC } from "react";
import "./sender.css";
import { ReactComponent as Heart } from "./heart.svg";

export interface SenderProps {
  contents?: string;
  to?: string;
  coin?: string;
  changeContents?: (contents: string) => void;
  changeTo?: (to: string) => void;
  changeCoin?: (coin: string) => void;
  clear?: () => void;
  sendPost?: (constents: string) => void;
}

const Sender: FC<SenderProps> = ({
  contents = "",
  to = "",
  coin = "",
  changeContents = () => {},
  changeTo = () => {},
  changeCoin = () => {},
  clear = () => {},
  sendPost = () => {}
}) => (
  <div className="sender">
    <input
      className="sender-to"
      name="to"
      value={to}
      placeholder="宛先"
      onChange={e => {
        changeTo(e.target.value);
      }}
    />
    <input
      className="sender-coin"
      name="coin"
      value={coin}
      placeholder="コイン"
      onChange={e => {
        changeCoin(e.target.value);
      }}
    />
    <textarea
      className="sender-contents"
      name="contents"
      value={contents}
      placeholder="内容"
      onChange={e => {
        changeContents(e.target.value);
      }}
    />
    <button
      className="sender-button"
      type="button"
      onClick={e => {
        if (contents !== "" && to !== "") {
          clear();
          sendPost(contents);
        }
      }}
    >
      <Heart width="20px" height="20px" />
    </button>
  </div>
);

export default Sender;

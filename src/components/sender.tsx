import React, { FC } from "react";
import "./sender.css";

export interface SenderProps {
  contents?: string;
  to?: string;
  coin?: string;
  changeContents?: (contents: string) => void;
  changeTo?: (to: string) => void;
  changeCoin?: (coin: string) => void;
  clear?: () => void;
  add?: (contents: string, from: string, to: string, coin: string) => void;
  nice?: (senderId: string, receiverId: string, contents: string) => void;
}

const Sender: FC<SenderProps> = ({
  contents = "",
  to = "",
  coin = "",
  changeContents = () => {},
  changeTo = () => {},
  changeCoin = () => {},
  clear = () => {},
  add = () => {},
  nice = () => {}
}) => (
  <div id="sender">
    <input
      className="sender-to"
      name="to"
      value={to}
      placeholder="宛先"
      onChange={e => {
        console.log("to");
        changeTo(e.target.value);
      }}
    />
    <input
      className="sender-coin"
      name="coin"
      value={coin}
      placeholder="コイン"
      onChange={e => {
        console.log("coin");
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
      type="button"
      onClick={e => {
        if (contents !== "" && to !== "") {
          clear();
          add(contents, "私", to, coin);
          nice("0001", "0002", "aaa");
        }
      }}
    >
      いいね！
    </button>
  </div>
);

export default Sender;

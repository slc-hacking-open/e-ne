import React, { FC, useState } from "react";
import "./post.css";
import { ReactComponent as Thumb } from "./thumb.svg";

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
}) => {
  const [localEmpathyCount, setlocalEmpathyCount] = useState(empathyCount);
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="post">
      <div className="post-thumbnail">
        <img
          className="post-thumbnail-img"
          src="/human.png"
          alt="いいねした人"
        />
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
          className="post-empathyButton"
          type="button"
          onClick={() => {
            if (clickCount === 0) {
              // １回だけクリック可能にする
              // 共感数が即時同期的である必要はないので、ローカルステートを使う
              // TODO: サーバから自分が対象に共感したことあるかをもらう
              empathy("0001", id); // TODO: userId
              setlocalEmpathyCount(localEmpathyCount + 1);
              setClickCount(clickCount + 1);
            } else {
              setClickCount(clickCount + 1);
            }
          }}
        >
          <Thumb
            className={(() => {
              if (clickCount === 0) {
                return "post-thumb";
                // eslint-disable-next-line
              } else if (clickCount === 1) {
                return "post-thumb post-thumb-clicked";
              } else if (clickCount % 2 === 0) {
                return "post-thumb post-thumb-boo1";
              } else {
                return "post-thumb post-thumb-boo2";
              }
            })()}
            width="2em"
            height="auto"
          />
        </button>
        <span>{localEmpathyCount}</span>
      </div>
    </div>
  );
};

export default Post;

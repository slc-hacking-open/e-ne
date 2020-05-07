import React, { FC, useState } from "react";
import "./post.css";
import { ReactComponent as Heart } from "./heart.svg";

export interface PostProps {
  id?: string;
  sender?: {
    id?: string;
    name?: string;
    department?: string;
    imageurl?: string;
  };
  receiver?: {
    id?: string;
    name?: string;
    department?: string;
    imageurl?: string;
  };
  contents?: string;
  from?: string;
  to?: string;
  datetime?: string;
  empathyCount?: number;
  empathy?: (userId: string, postId: string) => void;
  hasEmpathized?: boolean;
}

const Post: FC<PostProps> = ({
  id = "0",
  sender = { name: "" },
  receiver = { name: "" },
  contents = "",
  datetime = "",
  empathyCount = 0,
  empathy = () => {},
  hasEmpathized = false
}) => {
  // 共感数はサーバーど非同期
  // 画面上はローカルステートの数字を表示
  const [localEmpathyCount, setlocalEmpathyCount] = useState(empathyCount);
  const [localEmpathized, setlocalEmpathized] = useState(hasEmpathized);

  return (
    <div className="post">
      <div className="post-main">
        <div className="post-thumbnail">
          <img
            className="post-thumbnail-img"
            src={sender.imageurl}
            alt="いいねした人"
          />
          <p className="post-thumbnail-name">{sender.name}</p>
        </div>
        <div className="post-contents">
          <p className="post-contents-p">{contents}</p>
        </div>
        <div className="post-thumbnail">
          <img
            className="post-thumbnail-img"
            src={receiver.imageurl}
            alt="いいねされた人"
          />
          <p className="post-thumbnail-name">{receiver.name}</p>
        </div>
      </div>
      <div className="post-footer">
        <div className="post-time">
          <p>{datetime}</p>
        </div>
        <div className="post-empathy">
          <button
            className="post-empathyButton"
            type="button"
            onClick={() => {
              empathy(id, "111111");
              if (localEmpathized) {
                setlocalEmpathyCount(Number(localEmpathyCount) - 1);
                setlocalEmpathized(false);
              } else {
                setlocalEmpathyCount(Number(localEmpathyCount) + 1);
                setlocalEmpathized(true);
              }
            }}
          >
            <Heart
              className={(() => {
                if (localEmpathized) {
                  return "post-icon post-icon-clicked";
                  // eslint-disable-next-line
                } else {
                  return "post-icon";
                }
              })()}
            />
          </button>
          <p className="post-empathyCount">{Number(localEmpathyCount)}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

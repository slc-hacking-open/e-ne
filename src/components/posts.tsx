import React, { FC, useEffect } from "react";

import Post from "../containers/post";
import { PostProps } from "./post";

export interface PostsProps {
  pageNumber?: number;
  pageSize?: number;
  posts?: PostProps[];
  getPosts?: (userId: string) => void;
}

const Posts: FC<PostsProps> = ({
  pageNumber = 0,
  pageSize = 0,
  posts = [],
  getPosts = () => {}
}) => {
  useEffect(() => {
    getPosts("0001");
  }, []);

  return (
    <div className="posts">
      <div className="posts-timeline">
        {posts.map((post: PostProps) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              sender={post.sender}
              receiver={post.receiver}
              contents={post.contents}
              datetime={post.datetime}
            />
          );
        })}
      </div>
      <div className="posts-pagenation">
        <p>
          {pageNumber}/{pageSize}
        </p>
      </div>
    </div>
  );
};

export default Posts;

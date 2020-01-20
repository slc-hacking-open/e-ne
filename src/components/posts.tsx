import React, { FC, useEffect } from "react";

import { PostProps } from "./post";
import Post from "../containers/post";

export interface PostsProps {
  posts?: Array<PostProps>;
  getPosts?: (userId: number) => void;
}

const Posts: FC<PostsProps> = ({ posts = [], getPosts = () => {} }) => {
  useEffect(() => {
    getPosts(0);
  }, []);

  return (
    <div className="posts">
      {posts.map((post: PostProps) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            contents={post.contents}
            from={post.from}
            to={post.to}
          />
        );
      })}
    </div>
  );
};

export default Posts;

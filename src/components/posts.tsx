import React, { FC, useEffect } from "react";

import Post, { PostProps } from "./post";

export interface PostsProps {
  posts?: PostProps[];
  getPosts?: (userId: string) => void;
}

const Posts: FC<PostsProps> = ({ posts = [], getPosts = () => {} }) => {
  useEffect(() => {
    getPosts("0001");
  }, []);

  return (
    <div className="posts">
      {posts.map((post: PostProps) => {
        return <Post key={post.id} id={post.id} contents={post.contents} />;
      })}
    </div>
  );
};

export default Posts;

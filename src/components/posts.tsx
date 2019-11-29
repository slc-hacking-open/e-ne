import React, { FC } from "react";

import Post, { PostProps } from "./post";

export interface PostsProps {
  posts: Array<PostProps>;
}

const Posts: FC<PostsProps> = ({ posts = [] }) => (
  <div id="posts">
    {posts.map((post: PostProps) => {
      return <Post contents={post.contents} from={post.from} to={post.to} />;
    })}
  </div>
);

export default Posts;

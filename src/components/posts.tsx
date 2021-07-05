import React, { FC } from 'react'

import Post from '../containers/post'
import { PostProps } from './post'

export interface PostsProps {
  pageNumber?: number
  pageSize?: number
  posts?: PostProps[]
}

const Posts: FC<PostsProps> = ({ posts = [] }) => {
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
              empathyUsers={post.empathyUsers}
              empathyCount={post.empathyCount}
              hasEmpathized={post.hasEmpathized}
            />
          )
        })}
      </div>
      <div className="posts-pagenation">
        <p>{/*
          {pageNumber}/{pageSize}
          */}</p>
      </div>
    </div>
  )
}

export default Posts

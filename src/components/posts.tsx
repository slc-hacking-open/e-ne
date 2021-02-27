import React, { FC, useEffect } from 'react'

import Post from '../containers/post'
import { PostProps } from './post'

export interface PostsProps {
  pageNumber?: number
  pageSize?: number
  posts?: PostProps[]
  getPosts?: (department: string, userId: string) => void
}

const Posts: FC<PostsProps> = ({ posts = [], getPosts = () => {} }) => {
  useEffect(() => {
    // TODO: userId
    getPosts('SLC／生保ソリューション第２部', '111111')
    // eslint-disable-next-line
  }, [])

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

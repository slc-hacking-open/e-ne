import React, { FC, useEffect } from 'react'

import Post from '../containers/post'
import { PostProps } from './post'
import { User } from '../services/models'

export interface PostsProps {
  pageNumber?: number
  pageSize?: number
  posts?: PostProps[]
  getPosts?: (userId: string) => void
  ownUser?: User
}

const Posts: FC<PostsProps> = ({
  posts = [],
  getPosts = () => {},
  ownUser = undefined,
}) => {
  useEffect(() => {
    getPosts(ownUser?.userid ? ownUser?.userid : '')
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

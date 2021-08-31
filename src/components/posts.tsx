import React, { FC } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { Grid } from '@material-ui/core'

import Post from '../containers/post'
import { PostProps } from './post'

export interface PostsProps {
  pageNumber?: number
  pageSize?: number
  posts?: PostProps[]
  displayedCards?: PostProps[]
  setPageNumber?: (pageNumber: number) => void
  setDisplayedCards?: () => void
}

const Posts: FC<PostsProps> = ({
  pageSize = 1,
  pageNumber = 1,
  displayedCards = [],
  setPageNumber = () => {},
  setDisplayedCards = () => {},
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page)
    setDisplayedCards()
  }

  return (
    <div className="posts">
      <div className="posts-timeline">
        {displayedCards.map((post: PostProps) => {
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
        <Grid container alignItems="center" justify="center">
          <Pagination
            count={pageSize}
            page={pageNumber}
            variant="outlined"
            size="small"
            onChange={handleChange}
          />
        </Grid>
      </div>
    </div>
  )
}

export default Posts

import { FC } from 'react'
import { useDispatch } from 'react-redux'
import Post, { PostProps } from '../components/post'
import { empathy } from '../post/asycActions'

const PostContainer: FC<PostProps> = (props) => {
  const dispatch = useDispatch()

  return Post({
    empathy: (userId: string, postId: string) =>
      dispatch(empathy({ userId, postId })),
    ...props,
  })
}

export default PostContainer

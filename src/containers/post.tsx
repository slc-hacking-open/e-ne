import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post, { PostProps } from '../components/post'
import { empathy } from '../post/asycActions'
import { RootState } from '../rootReducer'

const PostContainer: FC<PostProps> = (props) => {
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => state.profile)

  return Post({
    empathy: (userId: string, postId: string) =>
      dispatch(empathy({ userId, postId })),
    ownUser: profile.user,
    ...props,
  })
}

export default PostContainer

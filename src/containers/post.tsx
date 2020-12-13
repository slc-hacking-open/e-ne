import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import Post, { PostProps } from '../components/post'
import { empathy } from '../store/actions/post'

const PostContainer: FC<PostProps> = (props) => {
  const dispatch = useDispatch()

  return Post({ empathy: bindActionCreators(empathy, dispatch), ...props })
}

export default PostContainer

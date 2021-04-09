import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import Post, { PostProps } from '../components/post'
import { empathy } from '../post/asycActions'

const PostContainer: FC<PostProps> = (props) => {
  const dispatch = useDispatch()
  const [userid, setUserid] = useState<string>('')

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => Auth.userAttributes(user))
      .then((attributes) => {
        const id = attributes.find(
          (attribute) => attribute.Name === 'custom:eneid'
        )?.Value
        setUserid(id || '')
      })
  }, [])

  return Post({
    ...props,
    empathy: (postId: string, userId: string) =>
      dispatch(empathy({ postId, userId })),
    empathizerid: userid,
  })
}

export default PostContainer

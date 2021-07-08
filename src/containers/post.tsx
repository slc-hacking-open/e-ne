import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import Post, { PostProps } from '../components/post'
import { empathyAdd, empathyRemove } from '../post/asycActions'

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
    empathyAdd: (postId: string, userId: string) =>
      dispatch(empathyAdd({ postId, userId })),
    empathyRemove: (postId: string, userId: string) =>
      dispatch(empathyRemove({ postId, userId })),
    empathizerid: userid,
  })
}

export default PostContainer

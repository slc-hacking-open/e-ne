import { useSelector, useDispatch } from 'react-redux'
import { FC, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import Posts from '../components/posts'
import { getPosts } from '../posts/asyncActions'
import { RootState } from '../rootReducer'
import { setDisplayedCards, setPageNumber } from '../posts/slice'

type PostsContainerProps = {
  filter?: 'sender' | 'receiver'
}

const PostsContainer: FC<PostsContainerProps> = ({ filter }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => Auth.userAttributes(user))
      .then((attributes) => {
        const userid = attributes.find(
          (attribute) => attribute.Name === 'custom:eneid'
        )?.Value
        dispatch(
          getPosts({
            userid: userid || '',
            senderId: filter === 'sender' ? userid : '',
            receiverId: filter === 'receiver' ? userid : '',
          })
        )
      })
  }, [])
  const posts = useSelector((state: RootState) => ({
    ...state.posts,
    displayedCards: state.posts.displayedCards.map((post) => {
      // 日付を`年月日`に変換する
      const year = post.datetime.substr(0, 4)
      const month = post.datetime.substr(4, 2)
      const date = post.datetime.substr(6, 2)
      const format = `${year}/${month}/${date}`

      const d = new Date(format)

      return {
        ...post,
        datetime: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`,
      }
    }),
  }))

  return Posts({
    pageNumber: posts.pageNumber,
    pageSize: posts.pageSize,
    posts: posts.posts,
    displayedCards: posts.displayedCards,
    setPageNumber: (page: number) => dispatch(setPageNumber(page)),
    setDisplayedCards: () => dispatch(setDisplayedCards()),
  })
}

export default PostsContainer

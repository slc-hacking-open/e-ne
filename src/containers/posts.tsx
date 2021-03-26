import { useSelector, useDispatch } from 'react-redux'
import { FC } from 'react'
import Posts from '../components/posts'
import { getPosts } from '../posts/asyncActions'
import { RootState } from '../rootReducer'

const PostsContainer: FC = () => {
  const posts = useSelector((state: RootState) => ({
    ...state.posts,
    posts: state.posts.posts.map((post) => {
      // 日付を`年月日`に変換する
      const year = post.datetime.substr(0, 4)
      const month = post.datetime.substr(4, 2)
      const date = post.datetime.substr(6, 2)
      const format = `${year}/${month}/${date}`

      const d = new Date(format)

      return {
        ...post,
        datetime: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`,
        hasEmpathized: post.hasEmpathized,
      }
    }),
  }))
  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()

  return Posts({
    pageNumber: posts.pageNumber,
    pageSize: posts.pageSize,
    posts: posts.posts,
    getPosts: (userid: string) => dispatch(getPosts({ userid })),
    ownUser: profile.user,
  })
}

export default PostsContainer

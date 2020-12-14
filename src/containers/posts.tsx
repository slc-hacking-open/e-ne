import { useSelector, useDispatch } from 'react-redux'
import { FC } from 'react'
import Posts from '../components/posts'
import { getPosts } from '../store/actions/posts'
import { AppState } from '../store/store'

const PostsContainer: FC = () => {
  const posts = useSelector((state: AppState) => ({
    ...state.posts,
    posts: state.posts.posts.map((post) => {
      // ISO 8601形式の日付を`年月日`に変換する
      const d = new Date(post.datetime)

      return {
        ...post,
        datetime: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`,
        hasEmpathized: post.hasEmpathized,
      }
    }),
  }))
  const dispatch = useDispatch()

  return Posts({
    pageNumber: posts.pageNumber,
    pageSize: posts.pageSize,
    posts: posts.posts,
    getPosts: (department, userId) => dispatch(getPosts(department, userId)),
  })
}

export default PostsContainer

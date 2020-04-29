import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import Posts from "../components/posts";
import { PostProps } from "../components/post";
import { getPosts } from "../actions/posts";
import { AppState } from "../reducer";

interface StateProps {
  pageNumber: number;
  pageSize: number;
  posts: PostProps[];
}

interface DispatchProps {
  getPosts: (userId: string) => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  ...state.posts,
  posts: state.posts.posts.map(post => {
    // ISO 8601形式の日付を`年月日`に変換する
    const d = new Date(post.datetime);

    return {
      ...post,
      datetime: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    };
  })
});

const mapDispatchToProps = (
  // eslint-disable-next-line
  dispatch: ThunkDispatch<any, any, any>
): DispatchProps => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

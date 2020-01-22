import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import Posts from "../components/posts";
import { PostProps } from "../components/post";
import { getPosts } from "../actions/posts";
import { AppState } from "../reducer";

interface StateProps {
  posts: PostProps[];
}

interface DispatchProps {
  getPosts: (userId: string) => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  posts: state.posts.posts
});

const mapDispatchToProps = (
  // eslint-disable-next-line
  dispatch: ThunkDispatch<any, any, any>
): DispatchProps => ({
  getPosts: userId => dispatch(getPosts(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

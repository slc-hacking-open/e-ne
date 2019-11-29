import { connect } from "react-redux";
// import { Dispatch } from "redux";

import { PostProps } from "../components/post";
import Posts from "../components/posts";
import { AppState } from "../reducer";

interface StateProps {
  posts: Array<PostProps>;
}

// interface DispatchProps {}

const mapStateToProps = (state: AppState): StateProps => ({
  posts: state.posts.posts
});

/*
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
});
*/

export default connect(mapStateToProps)(Posts);

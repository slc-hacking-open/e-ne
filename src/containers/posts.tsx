import { connect } from "react-redux";

import { PostState } from "./post";
import Posts from "../components/posts";
import { AppState } from "../reducer";

interface StateProps {
  posts: Array<PostState>;
}

const mapStateToProps = (state: AppState): StateProps => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps)(Posts);

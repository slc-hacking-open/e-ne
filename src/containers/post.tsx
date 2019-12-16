import { connect } from "react-redux";
import { Dispatch } from "redux";

import { empathy } from "../actions/post";
import Posts from "../components/posts";
import { AppState } from "../reducer";

export interface PostState {
  id: number;
  contents: string;
  from: string;
  to: string;
}

interface StateProps {
  posts: Array<PostState>;
}

interface DispatchProps {
  empathy: () => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  posts: state.posts.posts
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  empathy: () => dispatch(empathy())
});

export default connect(mapStateToProps)(Posts);

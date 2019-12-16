import { connect } from "react-redux";

import Posts from "../components/posts";
import { AppState } from "../reducer";

interface StateProps {
  posts: Array<{
    id: number;
    contents: string;
    from: string;
    to: string;
  }>;
}

const mapStateToProps = (state: AppState): StateProps => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps)(Posts);

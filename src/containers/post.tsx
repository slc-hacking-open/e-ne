import { connect } from "react-redux";
import { Dispatch } from "redux";

import { good } from "../actions/post";
import Post from "../components/post";
import { PostState } from "../reducer";

interface StateProps {
  contents: string;
  from: string;
  to: string;
}

interface DispatchProps {
  good: () => void;
}

const mapStateToProps = (state: PostState): StateProps => ({
  contents: state.contents,
  from: state.from,
  to: state.to,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  good: () => dispatch(good()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

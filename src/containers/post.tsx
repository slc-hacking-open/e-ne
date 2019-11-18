import { connect } from "react-redux";
import { Dispatch } from "redux";

import { empathy } from "../actions/post";
import Post from "../components/post";
import { AppState } from "../reducer";

interface StateProps {
  contents: string;
  from: string;
  to: string;
}

interface DispatchProps {
  empathy: () => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  contents: state.post.contents,
  from: state.post.from,
  to: state.post.to,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  empathy: () => dispatch(empathy()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

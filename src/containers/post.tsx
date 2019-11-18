import { connect } from "react-redux";
import { Dispatch } from "redux";

import { empathy } from "../actions/post";
import Post from "../components/post";
import { PostState } from "../reducer";

interface StateProps {
  contents: string;
  from: string;
  to: string;
}

interface DispatchProps {
  empathy: () => void;
}

const mapStateToProps = (state: PostState): StateProps => ({
  contents: state.contents,
  from: state.from,
  to: state.to,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  empathy: () => dispatch(empathy()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { PostAction, empathy, pushEmpathy } from "../actions/post";
import { AppState } from "../reducer";
import Post from "../components/post";

interface DispatchProps {
  empathy: (id: number) => void;
  pushEmpathy: (id: number) => void;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, undefined, PostAction>
): DispatchProps => ({
  empathy: (id: number) => dispatch(empathy(id)),
  pushEmpathy: (id: number) => dispatch(pushEmpathy(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

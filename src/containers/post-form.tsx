import { connect } from "react-redux";
import { Dispatch } from "redux";

import { send, changeContents, changeTo } from "../actions/post-form";
import PostForm from "../components/post-form";
import { AppState } from "../reducer";

interface StateProps {
  contents: string;
  to: string;
}

interface DispatchProps {
  changeContents: (contents: string) => void;
  changeTo: (contents: string) => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  contents: state.postForm.contents,
  to: state.postForm.to
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeContents: (contents: string) => dispatch(changeContents(contents)),
  changeTo: (to: string) => dispatch(changeTo(to))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

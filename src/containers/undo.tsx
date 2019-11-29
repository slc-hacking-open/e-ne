import { connect } from "react-redux";
import { Dispatch } from "redux";

// import { UndoProps } from "../components/undo";
import Undo from "../components/undo";
import { AppState } from "../reducer";
import { undo } from "../actions/undo";

interface StateProps {
  undoCount: number;
}

interface DispatchProps {
  undo: () => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  undoCount: state.posts.posts.length
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  undo: () => dispatch(undo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Undo);

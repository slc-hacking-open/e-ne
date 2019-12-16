import { connect } from "react-redux";
import { Dispatch } from "redux";

import { empathy } from "../actions/post";
import Post from "../components/post";

interface DispatchProps {
  empathy: (id: number) => void;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  empathy: (id: number) => dispatch(empathy(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

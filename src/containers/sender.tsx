import { connect } from "react-redux";
import { Dispatch } from "redux";

import { add } from "../actions/posts";
import { changeContents, changeTo, changeCoin, clear } from "../actions/sender";
import Sender from "../components/sender";
import { AppState } from "../reducer";

interface StateProps {
  contents: string;
  to: string;
  coin: string;
}

interface DispatchProps {
  changeContents: (contents: string) => void;
  changeTo: (contents: string) => void;
  changeCoin: (contents: string) => void;
  clear: () => void;
  add: (contents: string, from: string, to: string, coin: string) => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  contents: state.sender.contents,
  to: state.sender.to,
  coin: state.sender.coin
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeContents: (contents: string) => dispatch(changeContents(contents)),
  changeTo: (to: string) => dispatch(changeTo(to)),
  changeCoin: (coin: string) => dispatch(changeCoin(coin)),
  clear: () => dispatch(clear()),
  add: (contents: string, from: string, to: string) =>
    dispatch(add(contents, from, to))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sender);

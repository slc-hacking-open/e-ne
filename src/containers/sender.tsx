import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { sendPost } from "../actions/posts";
import {
  changeContents,
  changeTo,
  changeCoin,
  clear,
  getUsers
} from "../actions/sender";
import Sender from "../components/sender";
import { AppState } from "../reducer";

interface StateProps {
  contents: string;
  to: string;
  coin: string;
  users: [];
}

interface DispatchProps {
  changeContents: (contents: string) => void;
  changeTo: (to: string) => void;
  changeCoin: (coin: string) => void;
  clear: () => void;
  sendPost: (contents: string) => void;
  getUserList: () => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  contents: state.sender.contents,
  to: state.sender.to,
  coin: state.sender.coin,
  users: state.sender.users
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, undefined, any>
): DispatchProps => ({
  changeContents: (contents: string) => dispatch(changeContents(contents)),
  changeTo: (to: string) => dispatch(changeTo(to)),
  changeCoin: (coin: string) => dispatch(changeCoin(coin)),
  clear: () => dispatch(clear()),
  sendPost: (contents: string) => dispatch(sendPost(contents)),
  getUserList: () => dispatch(getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sender);

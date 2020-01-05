import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import * as Action from "../actions/constants";
import { getProfile } from "../actions/profile";
import { getProfileFactory } from "../services/api";

function* runGetProfile(action: ReturnType<typeof getProfile.start>) {
  const userid = "111111";

  try {
    const api = getProfileFactory();
    const user = yield call(api, userid);

    yield put(getProfile.succeed({ userid }, { user }));
  } catch (error) {
    yield put(getProfile.fail({ userid }, error));
  }
}
export function* watchGetProfile() {
  yield takeLatest(Action.GET_PROFILE_START, runGetProfile);
}

export default function* rootSaga() {
  yield all([fork(watchGetProfile)]);
}

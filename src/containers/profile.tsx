import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import DispProfile, { ProfileProps } from "../components/profile";
import { User } from "../services/models";
import { AppState } from "../reducer";
import { getProfile } from "../actions/profile";

interface StateProps {
  user: User;
  isLoading?: boolean;
}

interface DispatchProps {
  getProfileStart: (userid: string) => void;
}

type EnhancedProfileProps = ProfileProps & StateProps & DispatchProps;

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.profile.user,
  isLoading: state.profile.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getProfileStart: (userid: string) => getProfile(userid)
    },
    dispatch
  );

const ProfileContainer: FC<EnhancedProfileProps> = ({
  user,
  isLoading,
  getProfileStart
}) => {
  const userid = "111111";

  useEffect(() => {
    getProfileStart(userid);
    // eslint-disable-next-line
  }, []);

  return <DispProfile user={user} isLoading={isLoading} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
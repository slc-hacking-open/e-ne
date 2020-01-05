import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";

import DispProfile, { ProfileProps } from "../components/profile";
import { User } from "../services/models";
import { ProfileState } from "../reducers/profile-reducer";
import { getProfile } from "../actions/profile";

interface StateProps {
  user: User;
  isLoading?: boolean;
}

interface DispatchProps {
  getProfileStart: (userid: string) => void;
}

type EnhancedProfileProps = ProfileProps &
  StateProps &
  DispatchProps &
  RouteComponentProps<{ userid: string }>;

const mapStateToProps = (state: ProfileState): StateProps => ({
  user: state.user,
  isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getProfileStart: (userid: string) => getProfile.start({ userid })
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
  });

  return <DispProfile user={user} isLoading={isLoading} />;
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
);

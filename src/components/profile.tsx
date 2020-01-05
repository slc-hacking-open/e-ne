import React, { FC } from "react";

import { User } from "../services/models";

export interface ProfileProps {
  user: User;
  isLoading?: boolean;
  upload?: () => void;
}

const DispProfile: FC<ProfileProps> = ({ user = {} }) => (
  <div className="profile">
    <p>{user.name}</p>
    <p>{user.profile}</p>
  </div>
);

export default DispProfile;

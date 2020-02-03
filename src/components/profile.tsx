import React, { FC } from "react";

import { User } from "../services/models";

export interface ProfileProps {
  user: User;
  isLoading?: boolean;
  upload?: () => void;
}

const DispProfile: FC<ProfileProps> = ({ user = {} }) => (
  <div className="profile">
    <img src={user.imageurl} alt="プロフィール画像" width="130" height="130" />
    <p>{user.name}</p>
    <p>{user.department}</p>
    <p>{user.profile}</p>
  </div>
);

export default DispProfile;

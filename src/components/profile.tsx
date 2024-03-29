import React, { FC } from 'react'

import { User } from '../services/models'
import './profile.css'

export interface ProfileProps {
  user: User
  isLoading?: boolean
}

const Profile: FC<ProfileProps> = ({ user }) => (
  <div className="profile">
    <div className="profile-imageFrame">
      <img
        className="profile-image"
        src={user.imageurl}
        alt="プロフィール画像"
      />
    </div>
    <p className="profile-name">{user.name}</p>
    <p className="profile-department">{user.department}</p>
    <p className="profile-profile">{user.profile}</p>
    <div className="coin">
      <p className="profile-enecoin">いいねコイン： {user.enecoin} 枚</p>
      <p className="profile-glicocoin">グリココイン： {user.glicocoin} 枚</p>
    </div>
  </div>
)

export default Profile

import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import DispProfile, { ProfileProps } from '../components/profile'
import { AppState } from '../store/store'
import { getProfile } from '../store/actions/profile'

interface DispatchProps {
  getProfileStart: (userid: string) => void
}

type EnhancedProfileProps = ProfileProps & DispatchProps

export const Profile: FC<EnhancedProfileProps> = ({
  user,
  isLoading,
  getProfileStart,
}) => {
  const userid = '111111'

  useEffect(() => {
    getProfileStart(userid)
  }, [])

  return <DispProfile user={user} isLoading={isLoading} />
}

const ProfileContainer: FC = () => {
  const profile = useSelector((state: AppState) => state.profile)
  const dispatch = useDispatch()

  return Profile({
    user: profile.user,
    isLoading: profile.isLoading,
    getProfileStart: bindActionCreators(getProfile, dispatch),
  })
}

export default ProfileContainer

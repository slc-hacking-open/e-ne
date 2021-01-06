import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Profile from '../components/profile'
import { getProfile } from '../profile/asyncActions'
import { RootState } from '../rootReducer'

const ProfileContainer: FC = () => {
  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()
  const userid = '111111'

  useEffect(() => {
    dispatch(getProfile({ userid }))
  }, [])

  return <Profile user={profile.user} isLoading={profile.isLoading} />
}

export default ProfileContainer

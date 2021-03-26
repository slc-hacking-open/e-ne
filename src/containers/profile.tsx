import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import Profile from '../components/profile'
import { getProfile } from '../profile/asyncActions'
import { RootState } from '../rootReducer'

const ProfileContainer: FC = () => {
  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) =>
      dispatch(getProfile({ email: user.attributes.email }))
    )
  }, [])

  return <Profile user={profile.user} isLoading={profile.isLoading} />
}

export default ProfileContainer

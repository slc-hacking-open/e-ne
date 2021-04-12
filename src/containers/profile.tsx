import { Auth } from 'aws-amplify'
import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Profile from '../components/profile'
import { getProfile } from '../profile/asyncActions'
import { RootState } from '../rootReducer'

const ProfileContainer: FC = () => {
  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => Auth.userAttributes(user))
      .then((attributes) => {
        const userid = attributes.find(
          (attribute) => attribute.Name === 'custom:eneid'
        )?.Value
        dispatch(
          getProfile({
            userid: userid || '',
          })
        )
      })
  }, [])

  return <Profile user={profile.user} isLoading={profile.isLoading} />
}

export default ProfileContainer

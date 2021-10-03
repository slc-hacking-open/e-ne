import { useSelector, useDispatch } from 'react-redux'
import { FC, useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import Sender from '../components/sender'
import { changeCoin, changeContents, changeTo, clear } from '../sender/slice'
import { reduceEneCoin } from '../profile/slice'
import { sendEne } from '../posts/asyncActions'
import { getUsers } from '../sender/asyncActions'
import { RootState } from '../rootReducer'

const SenderContainer: FC = () => {
  const sender = useSelector((state: RootState) => state.sender)
  const profile = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()
  const [userid, setUserid] = useState<string>('')

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => Auth.userAttributes(user))
      .then((attributes) => {
        const id = attributes.find(
          (attribute) => attribute.Name === 'custom:eneid'
        )?.Value
        setUserid(id || '')
      })
  }, [])

  return Sender({
    contents: sender.contents,
    to: sender.to,
    coin: sender.coin,
    changeContents: (contents: string) => dispatch(changeContents(contents)),
    changeTo: (to: string) => dispatch(changeTo(to)),
    changeCoin: (coin: string) => dispatch(changeCoin(coin)),
    clear: () => dispatch(clear()),
    sendEne: (
      senderId: string,
      receiverId: string,
      contents: string,
      coin: string
    ) => {
      dispatch(sendEne({ senderId, receiverId, contents, coin }))
      dispatch(reduceEneCoin(coin))
    },
    getUserList: () => dispatch(getUsers()),
    users: sender.users,
    userid,
    senderEneCoin: profile.user.enecoin,
  })
}

export default SenderContainer

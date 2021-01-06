import { useSelector, useDispatch } from 'react-redux'
import { FC } from 'react'
import Sender from '../components/sender'
import { changeCoin, changeContents, changeTo, clear } from '../sender/slice'
import { sendEne } from '../posts/asyncActions'
import { getUsers } from '../sender/asyncActions'
import { RootState } from '../rootReducer'

const SenderContainer: FC = () => {
  const sender = useSelector((state: RootState) => state.sender)
  const dispatch = useDispatch()

  return Sender({
    contents: sender.contents,
    to: sender.to,
    coin: sender.coin,
    changeContents: (contents: string) => dispatch(changeContents(contents)),
    changeTo: (to: string) => dispatch(changeTo(to)),
    changeCoin: (coin: string) => dispatch(changeCoin(coin)),
    clear: () => dispatch(clear()),
    sendEne: (senderId: string, receiverId: string, contents: string) =>
      dispatch(sendEne({ senderId, receiverId, contents })),
    getUserList: () => dispatch(getUsers()),
    users: sender.users,
  })
}

export default SenderContainer

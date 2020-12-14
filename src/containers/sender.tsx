import { useSelector, useDispatch } from 'react-redux'
import { FC } from 'react'
import { AppState } from '../store/store'
import Sender from '../components/sender'
import { Sender as SenderActions, getUsers } from '../store/actions/sender'
import { sendEne } from '../store/actions/posts'

const SenderContainer: FC = () => {
  const sender = useSelector((state: AppState) => state.sender)
  const dispatch = useDispatch()

  return Sender({
    contents: sender.contents,
    to: sender.to,
    coin: sender.coin,
    changeContents: (contents: string) =>
      dispatch(SenderActions.changeContents(contents)),
    changeTo: (to: string) => dispatch(SenderActions.changeTo(to)),
    changeCoin: (coin: string) => dispatch(SenderActions.changeCoin(coin)),
    clear: () => dispatch(SenderActions.clear()),
    sendEne: (senderId: string, receiverId: string, contents: string) =>
      dispatch(sendEne(senderId, receiverId, contents)),
    getUserList: () => dispatch(getUsers()),
    users: sender.users,
  })
}

export default SenderContainer

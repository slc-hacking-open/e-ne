import React, { FC, useEffect } from 'react'
import './sender.css'
import { ReactComponent as Heart } from './heart.svg'
import { User } from '../services/models'

export interface SenderProps {
  contents?: string
  to?: string
  coin?: string
  changeContents?: (contents: string) => void
  changeTo?: (to: string) => void
  changeCoin?: (coin: string) => void
  clear?: () => void
  sendEne?: (senderId: string, receiverId: string, contents: string) => void
  getUserList?: () => void
  users?: User[]
}

const Sender: FC<SenderProps> = ({
  contents = '',
  to = '',
  coin = '',
  changeContents = () => {},
  changeTo = () => {},
  changeCoin = () => {},
  clear = () => {},
  sendEne = () => {},
  getUserList = () => {},
  users = [],
}) => {
  useEffect(() => {
    getUserList()
  }, [])

  // 宛先セレクトボックスの作成
  const op = [
    <option key="" value="">
      宛先
    </option>,
  ]
  const userlist = users.filter((u) => u.userid !== '111111')
  const options = op.concat(
    userlist.map((user) => (
      <option key={user.userid} value={user.userid}>
        {user.name}
      </option>
    ))
  )

  return (
    <div className="sender">
      <select
        className="sender-to"
        name="to"
        value={to}
        onChange={(e) => {
          changeTo(e.target.value)
        }}
      >
        {options}
      </select>
      <input
        className="sender-coin"
        name="coin"
        value={coin}
        placeholder="コイン"
        onChange={(e) => {
          changeCoin(e.target.value)
        }}
      />
      <textarea
        className="sender-contents"
        name="contents"
        value={contents}
        placeholder="内容"
        onChange={(e) => {
          changeContents(e.target.value)
        }}
      />
      <button
        className="sender-button"
        type="button"
        onClick={() => {
          if (contents !== '' && to !== '') {
            sendEne('111111', to, contents)
            clear()
          }
        }}
      >
        <Heart width="20px" height="20px" />
      </button>
    </div>
  )
}

export default Sender

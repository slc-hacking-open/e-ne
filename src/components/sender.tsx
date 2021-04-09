/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect } from 'react'
import './sender.css'
import { makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
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
  userid?: string
}

const useStyles = makeStyles(() => ({
  resize: {
    fontSize: 10,
  },
  '& input::placeholder': {
    fontSize: '10px',
  },
}))

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
  userid = '0',
}) => {
  useEffect(() => {
    getUserList()
  }, [])

  // 宛先セレクトボックスの作成
  const classes = useStyles()
  const userlist = users.filter((u) => u.userid !== userid)
  const options = userlist.map((option) => {
    const department = option.department.toUpperCase()
    const name = option.name.toUpperCase()

    return {
      ...option,
      department: /[0-9]/.test(department) ? '0-9' : department,
      name: /[0-9]/.test(name) ? '0-9' : name,
    }
  })

  return (
    <div className="sender">
      <Autocomplete
        id="sender-auto-complete"
        options={options
          .sort((a, b) => -b.name.localeCompare(a.name))
          .sort((a, b) => -b.department.localeCompare(a.department))}
        groupBy={(option) => option.department}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.name === value.name}
        style={{ width: 200, marginBottom: '0.5rem' }}
        onChange={(event, value) => {
          changeTo(value?.userid ? value.userid : '')
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="宛先"
            variant="outlined"
            onChange={(e) => {
              changeTo(e.target.value)
            }}
            InputLabelProps={{ style: { fontSize: 10 } }}
            FormHelperTextProps={{ style: { fontSize: 10 } }}
          />
        )}
        classes={{ input: classes.resize }}
      />
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
        data-testid="sender-button"
        type="button"
        onClick={() => {
          if (contents !== '' && to !== '') {
            sendEne(userid, to, contents)
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

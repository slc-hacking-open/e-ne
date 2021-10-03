/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect, useState } from 'react'
import './sender.css'
import { makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { ReactComponent as Ene } from '../ene.svg'
import { User } from '../services/models'

export interface SenderProps {
  contents?: string
  to?: string
  coin?: string
  changeContents?: (contents: string) => void
  changeTo?: (to: string) => void
  changeCoin?: (coin: string) => void
  clear?: () => void
  sendEne?: (
    senderId: string,
    receiverId: string,
    contents: string,
    coin: string
  ) => void
  getUserList?: () => void
  users?: User[]
  userid?: string
  senderEneCoin: number
}

const useStyles = makeStyles(() => ({
  resize: {
    fontSize: 10,
    backgroundColor: '#faebd7',
  },
  '& input::placeholder': {
    fontSize: '10px',
  },
  root: {
    marginBottom: '0.5rem',
    width: '100%',
    fontSize: 10,
    '& input::placeholder': {
      fontSize: '10px',
    },
    '& textarea::placeholder': {
      fontSize: '10px',
    },
    backgroundColor: '#faebd7',
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
  senderEneCoin = 0,
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

  // 宛先の入力チェック
  const [toError, setToError] = useState('')
  const handleBlurTo = () => {
    if (!to) {
      setToError('宛先を入力してください')
    } else {
      setToError('')
    }
  }

  // コインの入力チェック
  const [coinError, setCoinError] = useState('')
  const handleBlurCoin = () => {
    if (Number(coin) > senderEneCoin) {
      setCoinError('送信コインは所持コイン以下の枚数を指定してください')
    } else if (Number(coin) < 1 || Number(coin) > 10) {
      setCoinError('送信コインは１～１０の範囲を指定してください')
    } else {
      setCoinError('')
    }
  }

  // 内容の入力チェック
  const [contentsError, setContentsError] = useState('')
  const handleBlurContents = () => {
    if (!contents) {
      setContentsError('内容を入力してください')
    } else if (contents.length > 140) {
      setContentsError('内容は140字以内で入力してください')
    } else {
      setContentsError('')
    }
  }

  return (
    <div className="sender">
      {toError && <div className="error">{toError}</div>}
      <Autocomplete
        id="sender-auto-complete"
        options={options
          .sort((a, b) => -b.name.localeCompare(a.name))
          .sort((a, b) => -b.department.localeCompare(a.department))}
        groupBy={(option) => option.department}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.name === value.name}
        style={{ width: '100%', marginBottom: '0.5rem' }}
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
            onBlur={() => {
              handleBlurTo()
            }}
            InputLabelProps={{ style: { fontSize: 10 } }}
            FormHelperTextProps={{ style: { fontSize: 10 } }}
          />
        )}
        classes={{ input: classes.resize }}
      />
      {coinError && <div className="error">{coinError}</div>}
      <TextField
        variant="outlined"
        type="number"
        className={classes.root}
        name="coin"
        value={coin}
        placeholder="コイン"
        onChange={(e) => {
          changeCoin(e.target.value)
        }}
        onBlur={() => {
          handleBlurCoin()
        }}
      />
      {contentsError && <div className="error">{contentsError}</div>}
      <TextField
        multiline
        rows={4}
        variant="outlined"
        className={classes.root}
        data-testid="sender-contents"
        name="contents"
        value={contents}
        placeholder="内容"
        onChange={(e) => {
          changeContents(e.target.value)
        }}
        onBlur={() => {
          handleBlurContents()
        }}
      />
      <button
        className="sender-button"
        data-testid="sender-button"
        type="button"
        onClick={() => {
          if (toError === '' && contentsError === '' && coinError === '') {
            sendEne(userid, to, contents, coin)
            clear()
          }
        }}
      >
        いいね
        <Ene />
      </button>
    </div>
  )
}

export default Sender

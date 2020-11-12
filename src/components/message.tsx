import React, { FC } from 'react'
import './message.css'

export interface LoadingProps {
  error?: boolean
  message?: string
}

const Message: FC<LoadingProps> = ({ error = false, message = '' }) => (
  <div
    className={`message ${error ? 'message-error' : ''} ${
      message === '' ? 'message-none' : ''
    }`}
  >
    <p>{message}</p>
  </div>
)

export default Message

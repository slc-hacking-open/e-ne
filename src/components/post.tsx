import React, { FC, useState } from 'react'
import './post.css'
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { ReactComponent as Heart } from './heart.svg'
import { ReactComponent as Ene } from './thumb.svg'
import { User } from '../services/models'

type SimpleDialogProps = {
  onClose: () => void
  open: boolean
  empathyUsers: User[]
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, empathyUsers } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      scroll="paper"
      PaperProps={{
        style: {
          maxHeight: '400px',
        },
      }}
    >
      <DialogTitle id="simple-dialog-title">共感した人</DialogTitle>
      <List>
        {empathyUsers.map((user) => (
          <ListItem key={user.userid}>
            <ListItemAvatar>
              <Avatar src={user.imageurl} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export interface PostProps {
  id?: string
  sender?: {
    id?: string
    name?: string
    department?: string
    imageurl?: string
  }
  receiver?: {
    id?: string
    name?: string
    department?: string
    imageurl?: string
  }
  contents?: string
  from?: string
  to?: string
  datetime?: string
  empathyCount?: number
  empathyAdd?: (userId: string, postId: string) => void
  empathyRemove?: (userId: string, postId: string) => void
  empathyUsers?: User[]
  hasEmpathized?: boolean
  empathizerid?: string
}

const Post: FC<PostProps> = ({
  id = '0',
  sender = { name: '' },
  receiver = { name: '' },
  contents = '',
  datetime = '',
  empathyUsers = [],
  empathyCount = 0,
  empathyAdd = () => {},
  empathyRemove = () => {},
  hasEmpathized = false,
  empathizerid = '0',
}) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="post">
      <div className="post-main">
        <div className="post-thumbnail">
          <img
            className="post-thumbnail-img"
            src={sender.imageurl}
            alt="いいねした人"
          />
          <p className="post-thumbnail-name">{sender.name}</p>
        </div>
        <div className="thumb">
          <Ene />
        </div>
        <div className="post-thumbnail">
          <img
            className="post-thumbnail-img"
            src={receiver.imageurl}
            alt="いいねされた人"
          />
          <p className="post-thumbnail-name">{receiver.name}</p>
        </div>
      </div>
      <div className="post-contents">
        <p className="post-contents-p">{contents}</p>
      </div>
      <div className="post-footer">
        <div className="post-time">
          <p>{datetime}</p>
        </div>
        <div className="post-empathy">
          <button
            className="post-empathyButton"
            data-testid="post-empathyButton"
            type="button"
            onClick={() => {
              if (hasEmpathized) {
                empathyRemove(id, empathizerid)
              } else {
                empathyAdd(id, empathizerid)
              }
            }}
          >
            <Heart
              className={(() => {
                if (hasEmpathized) {
                  return 'post-icon post-icon-clicked'
                  // eslint-disable-next-line
                } else {
                  return 'post-icon'
                }
              })()}
            />
          </button>
          <button
            type="button"
            onClick={handleClickOpen}
            className="post-empathyCount"
          >
            {empathyCount}
          </button>
          <SimpleDialog
            empathyUsers={empathyUsers}
            open={open}
            onClose={handleClose}
          />
        </div>
      </div>
    </div>
  )
}

export default Post

import React, { ReactElement } from 'react'
import { Home, Mail } from '@material-ui/icons'
import HomePage from './pages/HomePage'
import SendCardsPage from './pages/SendCardsPage'
import ReceiveCardsPage from './pages/ReceiveCardsPage'

type Route = {
  name: string
  path: string
  linkIcon: ReactElement
  component: React.FC
}

const routes: Route[] = [
  {
    name: 'ホーム',
    path: '/',
    linkIcon: <Home />,
    component: HomePage,
  },
  {
    name: '受信カード',
    path: '/receive-cards',
    linkIcon: <Mail />,
    component: ReceiveCardsPage,
  },
  {
    name: '送信カード',
    path: '/send-cards',
    linkIcon: <Mail />,
    component: SendCardsPage,
  },
]

export default routes

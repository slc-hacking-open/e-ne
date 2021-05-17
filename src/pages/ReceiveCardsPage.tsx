import React from 'react'
import Posts from '../containers/posts'
import DispProfile from '../containers/profile'

const ReceiveCardsPage: React.FC = () => {
  return (
    <>
      <div className="main-contents">
        <Posts filter="receiver" />
      </div>
      <div className="main-sidemenu">
        <DispProfile />
      </div>
    </>
  )
}

export default ReceiveCardsPage

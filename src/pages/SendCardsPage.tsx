import React from 'react'
import Posts from '../containers/posts'
import DispProfile from '../containers/profile'

const SendCardsPage: React.FC = () => {
  return (
    <>
      <div className="main-contents">
        <Posts />
      </div>
      <div className="main-sidemenu">
        <DispProfile />
      </div>
    </>
  )
}

export default SendCardsPage

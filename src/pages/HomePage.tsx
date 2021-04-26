import React from 'react'
import Posts from '../containers/posts'
import DispProfile from '../containers/profile'
import Sender from '../containers/sender'

const HomePage: React.FC = () => {
  return (
    <>
      <div className="main-contents">
        <Posts />
      </div>
      <div className="main-sidemenu">
        <DispProfile />
        <Sender />
      </div>
    </>
  )
}

export default HomePage

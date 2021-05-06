import React from 'react'
import { useLocation } from 'react-router-dom'
import { ReactComponent as Ene } from './ene.svg'
import './Header.css'
import routes from './routes'

const Header: React.FC = () => {
  const location = useLocation()

  return (
    <header className="header">
      <Ene />
      <h1>e-ne</h1>
      <h2>{routes.find((route) => route.path === location.pathname)?.name}</h2>
    </header>
  )
}

export default Header

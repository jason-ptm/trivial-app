// styles
import './App.css'

// modules
import React from 'react'
import {
  useRoutes,
  useLocation,
  Navigate
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// components
import Home from './components/Home'
import Result from './components/Result'
import Questions from './components/Questions'

function App () {
  const location = useLocation()
  // const [currentUser, setCurrentUser] = React.useState({
  //   user: undefined,
  //   points: 0
  // })
  const [users, setUsers] = React.useState(JSON.parse(window.localStorage.getItem('users')) || [])

  React.useEffect(() => {
    if (users.length > 0) window.localStorage.setItem('users', users)
  }, [users])
  const routes = useRoutes([
    {
      path: '/',
      element: (<Home />)
    }, {
      path: '/questions',
      element: (<Questions />)
    }, {
      path: '/podium',
      element: (<Result users={setUsers} />)
    }, {
      path: '*',
      element: (<Navigate to='/' />)
    }
  ])

  return (
    <div className='App'>
      <AnimatePresence mode='wait'>
        {React.cloneElement(routes, { key: location.key })}
      </AnimatePresence>
    </div>
  )
}

export default App

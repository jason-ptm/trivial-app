import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.scss'
import store from './redux/store'
import { lazy } from 'react'

// components
const Home = lazy(() => import('./pages/Home/Home'))
const QuestionsContainer = lazy(
  () => import('./pages/QuestionsContainer/QuestionsContainer')
)
import { Loading } from './pages/Loading'
import { RoutesTypes } from './model'

function App() {
  const location = useLocation()

  // https://www.youtube.com/watch?v=p9PAmqpCWgA&ab_channel=GentlemanProgramming
  // 2:07:03
  // www.youtube.com/watch?v=m-w902RrJXA&list=PL42UNLc8e48SQRBqbOdPz4t3YHicEf5xs&index=3&ab_channel=GentlemanProgramming

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to={RoutesTypes.home} />} />
              <Route path={RoutesTypes.home} element={<Home />} />
              <Route
                path={RoutesTypes.questions}
                element={<QuestionsContainer />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </Provider>
      </Suspense>
    </div>
  )
}

export default App

// modules
import React from 'react'
import ProgressBar from './ProgressBar'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// services
import Data from '../services/Data'

// components
import Question from './Question'
import Background from './Background'
import SideBar from './SideBar'

export default function Questions () {
  const [flags, setFlags] = React.useState({
    stopFlag: false,
    changeFlag: false,
    correctFlag: false,
    responseFlag: false
  })

  const [currentQuestion, setCurrentQuestion] = React.useState({
    index: 0,
    object: {
      question: '',
      answers: [{}],
      response: ''
    }
  })

  // eslint-disable-next-line
  const [data, setData] = React.useState(new Data())
  // if i dont put the data class like this
  // the data doesnt save in object and cannot pass it to Question component

  const [points, setPoints] = React.useState({
    score: 0,
    time: 0
  })

  const navigate = useNavigate()

  React.useEffect(() => {
    const varr = data.getData()
    varr.then(() => {
      setCurrentQuestion({
        index: 0,
        object: data.parserQuestions[0]
      })
    })
  }, [])

  React.useEffect(() => {
    if (!flags.correctFlag) {
      setPoints(prevPoints => ({
        score: prevPoints.score + (Math.trunc((500 * prevPoints.time) / 115) + 100),
        time: 0
      }))
    }
    console.log(points)
  }, [flags.correctFlag])

  React.useEffect(() => {
    const timer = setTimeout(() => changeFlags({ stopFlag: false, changeFlag: false }), 500)
    return () => clearTimeout(timer)
  }, [flags.changeFlag])

  React.useEffect(() => {
    const timer = setTimeout(() => changeFlags({ responseFlag: false }), 2000)
    return () => clearTimeout(timer)
  }, [flags.responseFlag])

  const changeQuestion = () => {
    if (currentQuestion.index < data.parserQuestions.length - 1) {
      setCurrentQuestion(val => ({
        index: val.index + 1,
        object: data.parserQuestions[val.index + 1]
      }))
      changeFlags({ stopFlag: false, changeFlag: true })
    } else {
      navigate('/result')
    }
  }

  const changeFlags = (newFlags) => {
    setFlags(prevFlags => ({
      ...prevFlags,
      ...newFlags
    }))
  }

  const handleClick = () => {
    if (currentQuestion.object.response !== '') {
      if (flags.stopFlag) changeQuestion()
      else changeFlags({ stopFlag: true })
    } else changeFlags({ responseFlag: true })
  }

  return (
    <motion.div
      className='Questions'
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {
          flags.stopFlag
            ? ''
            : <ProgressBar stopFlag={flags.stopFlag} setFlags={setFlags} setPoints={setPoints}/>
        }

      </AnimatePresence>

      <Background flags={flags} />

      <motion.div className="podium-cont"
        animate={flags.stopFlag ? 'show' : 'hide'}
        variants={{
          hide: {
            x: '100%',
            transition: {
              delay: 0
            }
          },
          show: {
            x: 0,
            transition: {
              type: 'spring',
              stiffness: 100,
              delay: 0.6
            }
          }
        }}>
        <SideBar />
      </motion.div>

      <form className='form' onSubmit={e => e.preventDefault()}>
        {
          data.parserQuestions.length > 1
            ? <Question
              number={currentQuestion.index + 1}
              question={currentQuestion.object}
              setQuestion={setCurrentQuestion}
              stop={flags.stopFlag}
              data={data}
              setFlags={setFlags}
            />
            : ''
        }
        <motion.div
          animate={{
            opacity: flags.responseFlag ? 1 : 0,
            scale: flags.responseFlag ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 0.2 }}
          className='response-advice'>
          <i className="fa-solid fa-triangle-exclamation" />
          Seleccione alguna respuesta
        </motion.div>

        <motion.button
          animate={ !flags.changeFlag ? 'visible' : 'hidden'}
          className='btn'
          onClick={handleClick}
          variants={{
            visible: {
              opacity: 1, y: 0, transition: { delay: 1 }, pointerEvents: 'all'
            },
            hidden: { opacity: 0, y: -10, pointerEvents: 'none' }
          }}
        >
          {flags.stopFlag ? 'Siguiente pregunta' : 'Responder'}
        </motion.button>

      </form>
    </motion.div>
    // https://www.youtube.com/watch?v=p9PAmqpCWgA&ab_channel=GentlemanProgramming
  )
}

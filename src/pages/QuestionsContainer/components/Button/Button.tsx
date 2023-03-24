import { Answer } from '@/model'
import { answerQuestion } from '@/services/answerQuestion.service'
import { changeQuestion } from '@/services/changeQuestion.service'
import Alert from '@mui/material/Alert'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import './styles/Button.scss'
export interface ButtonProps {
  currentAnswer: Answer | undefined
  stop: boolean
  setStop: React.Dispatch<React.SetStateAction<boolean>>
}

const Button: React.FC<ButtonProps> = ({ currentAnswer, stop, setStop }) => {
  //advice not answer
  const [warning, setWarning] = useState(false)
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setWarning(false)
    }, 2000)
    return () => clearTimeout(timeOut)
  }, [warning])

  const handleClick = () => {
    if (typeof currentAnswer !== 'undefined' && !stop) {
      answerQuestion.setSubject(currentAnswer.correct)
      setStop(true)
    } else if (stop && currentAnswer) changeQuestion.setSubject(true)
    else setWarning(true)
  }

  return (
    <>
      <AnimatePresence>
        {warning ? (
          <motion.div
            className="advice"
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: '-100px' }}
          >
            <Alert variant="filled" severity="warning">
              Selecciona una opción!
            </Alert>
          </motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>

      <motion.div
        className="button btn"
        animate={'visible'}
        initial="hidden"
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 1 },
            pointerEvents: 'all',
          },
          hidden: { opacity: 0, y: -10, pointerEvents: 'none' },
        }}
        onClick={handleClick}
      >
        {!stop ? 'Responder' : 'Siguiente pregunta'}
      </motion.div>
    </>
  )
}

export default Button

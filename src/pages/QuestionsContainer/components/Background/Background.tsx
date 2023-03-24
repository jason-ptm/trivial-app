import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import ReactHowler from 'react-howler'
import './styles/Background.scss'
import success from '@/assets/sounds/success.mp3'
import error from '@/assets/sounds/error.mp3'
import { answerQuestion } from '@/services/answerQuestion.service'
export interface BackgroundProps {
  props?: unknown
}

const Background: React.FC<BackgroundProps> = () => {
  const [check, setcheck] = useState(false)
  const [correct, setCorrect] = useState(false)
  const subscription$ = answerQuestion.getSubject()

  useEffect(() => {
    subscription$.subscribe((data) => {
      if (typeof data === 'boolean') {
        setcheck(true)
        setCorrect(!!data)
      }
    })
  }, [])

  return (
    <div>
      <ReactHowler src={correct ? success : error} playing={check} />
      <AnimatePresence>
        {check ? (
          correct ? (
            <motion.div
              className="background correct"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0],
                transition: { duration: 0.6 },
              }}
            >
              {' '}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0],
                transition: { duration: 0.6 },
              }}
              className="background incorrect"
            />
          )
        ) : (
          ''
        )}
      </AnimatePresence>
    </div>
  )
}

export default Background

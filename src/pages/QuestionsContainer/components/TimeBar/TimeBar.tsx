import { addPoints } from '@/redux/states/currentUser'
import { answerQuestion } from '@/services/answerQuestion.service'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { topTime } from '../..'
import { Timer } from '../Timer'
import './styles/TimeBar.scss'
export interface TimeBarProps {
  stop: boolean
}

const TimeBar: React.FC<TimeBarProps> = ({ stop }) => {
  const [time, setTime] = useState(topTime)

  const animation = {
    visible: {
      scale: [1, 1.1, 1],
      background: ['#00F260', '#ED213A', '#00F260'],
      transition: {
        type: 'spring',
        stiffness: '100',
        repeat: 'Infinity',
        repeatType: 'reverse',
        duration: 1,
      },
    },
  }

  const barVariants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      y: '-100px',
      opacity: 0,
      transition: {
        delay: 0.8,
        duration: 0.7,
      },
    },
  }

  const subscription$ = answerQuestion.getSubject()

  const dispatch = useDispatch()

  useEffect(() => {
    subscription$.subscribe((data) => {
      if (data) {
        dispatch(addPoints((time * 200) / topTime + 100))
      }
    })
  }, [])

  return (
    <motion.div
      className="timeBar"
      variants={barVariants}
      animate={`${stop ? 'hidden' : 'visible'}`}
    >
      <div className="bar">
        <motion.div
          className="progress"
          style={{ width: `${(time * 100) / topTime}%` }}
        />
      </div>
      <motion.div
        className="timer"
        animate={time <= 10 && time > 0 && !stop ? 'visible' : ''}
        variants={animation}
      >
        <span className="time">
          <Timer setTime={setTime} time={time} stop={stop} />
        </span>
      </motion.div>
    </motion.div>
  )
}

export default TimeBar

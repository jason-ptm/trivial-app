import { answerQuestion } from '@/services/answerQuestion.service'
import React, { useEffect } from 'react'
export interface TimerProps {
  setTime: React.Dispatch<React.SetStateAction<number>>
  time: number
  stop: boolean
}

const Timer: React.FC<TimerProps> = ({ setTime, time, stop }) => {
  useEffect(() => {
    let interval: NodeJS.Timer
    if (time > 0 && !stop) {
      interval = setInterval(() => setTime((time) => time - 0.01), 10)
    } else if (time <= 0) {
      answerQuestion.setSubject(false)
    }
    return () => clearInterval(interval)
  }, [time])

  return <span>{Math.ceil(time)}</span>
}

export default Timer

import React from 'react'
import Timer from './Timer'
import { motion } from 'framer-motion'

export default function ProgressBar ({ stopFlag, setFlags, setPoints }) {
  const top = 120
  const [time, setTime] = React.useState(top)

  const animation = {
    visible: {
      scale: [1, 1.1],
      background: ['#00F260', '#ED213A'],
      transition: {
        type: 'spring',
        stiffness: '100',
        repeat: 'Infinity',
        repeatType: 'reverse',
        duration: 1
      }
    }
  }

  React.useEffect(() => {
    if (time <= 0) {
      setFlags(prevFlags => ({
        ...prevFlags,
        stopFlag: true
      }))
    }
  }, [time])

  return (
    <motion.div
      className='ProgressBar'
      exit={{ opacity: 0, duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='bar'>
        <motion.div className='progress' style={{ width: `${(time * 100) / top}%` }} />
      </div>
      <motion.div
        className='timer'
        variants={animation}
        animate={(time <= 10 && time > 0) ? 'visible' : ''}
      >
        <span className='time'>
          {time <= 0
            ? '0'
            : <Timer time={time} setTime={setTime} stopFlag={stopFlag} setPoints={setPoints}/>}
        </span>
      </motion.div>
    </motion.div>
  )
}

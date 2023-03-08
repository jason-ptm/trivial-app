// modules
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import ReactHowler from 'react-howler'

// sound
import error from '../assets/sounds/error.mp3'
import success from '../assets/sounds/success.mp3'

export default function Background ({ flags }) {
  return (
    <div>
      <ReactHowler src={flags.correctFlag ? success : error} playing={flags.stopFlag} />
      <AnimatePresence>
        {
          flags.stopFlag
            ? (
              flags.correctFlag
                ? (
                  <motion.div
                    className='background correct'
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [1, 0],
                      transition: { duration: 0.6 }
                    }}
                  > </motion.div>
                )
                : <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [1, 0],
                    transition: { duration: 0.6 }
                  }}
                  className='background incorrect'
                />
            )
            : ''
        }
      </AnimatePresence>
    </div>
  )
}

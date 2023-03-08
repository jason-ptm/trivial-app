// modules
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// images
import spainFlag from './../assets/spain-flag.png'
import usaFlag from './../assets/usa-flag.png'

// components
import SideBar from './SideBar'

export default function Home (props) {
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      border: '1px solid #fff',
      transition: {
        duration: 1
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: '0px 0px 12px #3498DB',
      textShadow: '0px 0px 12px #3498DB',
      color: '#9bb9cd',
      border: '1px solid #fff0',
      transition: {
        type: 'spring',
        stiffness: '100',
        repeat: 'Infinity',
        repeatType: 'reverse',
        duration: 1
      }
    }
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: {
      opacity: [1, 1],
      y: [10, -10],
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 1
      }
    }
  }

  // true = spanish; false = english
  const [langToggle, setLangToggle] = React.useState(true)

  return (
    <motion.div
      className='Home'
      exit={{
        x: '-100%'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='container'>
        <motion.h1
          className='title'
          variants={titleVariants}
          initial='hidden'
          animate='visible'
        >
          Quizizz!
        </motion.h1>
        <Link to='/questions' relative='path'>
          <motion.button
            variants={buttonVariants}
            initial='hidden'
            animate='visible'
            whileHover='hover'
            className='btn'
          >
            Empezar
          </motion.button>
        </Link>
        <motion.button
          className='btn'
          id='how-works'
          variants={buttonVariants}
          initial='hidden'
          animate='visible'
        >
          Como funciona
        </motion.button>
      </div>
      <div className='lang-btn'>
        <span
          className={`img${langToggle ? ' select' : ''}`}
          onClick={() => (setLangToggle(val => !val))}
        >
          <img src={spainFlag} />
        </span>
        <span
          className={`img${!langToggle ? ' select' : ''}`}
          onClick={() => (setLangToggle(val => !val))}
        >
          <img src={usaFlag} />
        </span>
      </div>

      <div className="podium-cont">
        <SideBar />
      </div>
    </motion.div>

  )
}

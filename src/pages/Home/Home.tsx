import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Home.scss'

// components
import { PodiumSideBar } from '@/components/PodiumSideBar'
import { LangButton } from './components'

// services
import { RoutesTypes } from '@/model'
import { buttonVariants, shadowVariants, titleVariants } from './services'

export interface HomeProps {
  props?: boolean
}

const Home: React.FC<HomeProps> = () => {
  return (
    <motion.div
      className="home"
      exit={{
        y: '-100%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      <motion.div className="container" initial="hidden" animate="visible">
        <motion.h1 className="title" variants={titleVariants}>
          Trivial!
        </motion.h1>
        <motion.div className="shadow" variants={shadowVariants} />
        <Link to={RoutesTypes.questions} relative="path">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="btn"
          >
            Empezar
          </motion.button>
        </Link>
      </motion.div>

      <LangButton />

      <div className="podium-cont">
        <PodiumSideBar />
      </div>
    </motion.div>
  )
}

export default Home

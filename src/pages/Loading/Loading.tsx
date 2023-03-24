import React from 'react'
import { motion } from 'framer-motion'
export interface LoadingProps {
  props?: unknown
}
import './styles/Loading.scss'

const Loading: React.FC<LoadingProps> = () => {
  return (
    <motion.div
      className="Loading"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <span className="loader" />
      <h2 className="title">Cargando...</h2>
    </motion.div>
  )
}

export default Loading

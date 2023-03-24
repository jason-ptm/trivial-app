import { Variants } from 'framer-motion'

export const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    border: '1px solid #fff',
    transition: {
      duration: 1,
    },
  },
  hover: {
    scale: 1.1,
    boxShadow: '0px 0px 12px #000',
    textShadow: '0px 0px 12px #000',
    border: '1px solid #fff0',
    transition: {
      type: 'spring',
      stiffness: '100',
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 1,
    },
  },
}

export const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: [1, 1],
    y: [10, -10],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 1,
    },
  },
}

export const shadowVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 1,
    },
  },
  visible: {
    opacity: [1, 1],
    scale: [1, 1.2],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 1,
    },
  },
}

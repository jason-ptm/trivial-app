import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useDimensions } from '@/utilities';
import './styles/PodiumSideBar.scss';
export interface PodiumSideBarProps { 
  children?: ReactNode
}

const PodiumSideBar: React.FC<PodiumSideBarProps> = () => {

  const [openFlag, setOpenFlag] = React.useState(false)
  const sidebar = {
    open: (height = 1000) => ({
      backgroundColor: '#fff',
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      backgroundColor: '#FFDF00',
      clipPath: 'circle(30px at 260px 40px)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  }

  const containerRef = React.useRef(null)
  const { height } = useDimensions(containerRef)

  return <motion.div
    className='podiumsidebar' initial={false}
    animate={openFlag ? 'open' : 'closed'}
    custom={height}
    ref={containerRef}
  >
    <motion.div className="background" variants={sidebar} />
    <div className="icon" onClick={() => setOpenFlag(val => !val)}>
      <motion.i
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        className="fa-solid fa-trophy" />
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5', opacity: 0 },
            open: { d: 'M 3 16.5 L 17 2.5', opacity: 1 }
          }}
          fill="transparent"
          strokeWidth="3"
          stroke="hsl(0, 0%, 18%)"
          strokeLinecap="round"
        />
        <motion.path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346', opacity: 0 },
            open: { d: 'M 3 2.5 L 17 16.346', opacity: 1 }
          }}
          fill="transparent"
          strokeWidth="3"
          stroke="hsl(0, 0%, 18%)"
          strokeLinecap="round"
        />
      </svg>
    </div>
    {/* <Podium /> */}
  </motion.div>
};

export default PodiumSideBar;

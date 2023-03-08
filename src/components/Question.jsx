import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

export default function Question ({ question, setQuestion, number, stop, data, setFlags }) {
  const handleClick = (index) => {
    if (!stop) {
      setQuestion(prevQuestion => ({
        ...prevQuestion,
        object: {
          ...prevQuestion.object,
          response: index
        }
      }))
    }
  }

  React.useEffect(() => {
    if (stop) {
      const dataAnswer = data.validateQuestion(number - 1)
      setQuestion(prevQuestion => ({
        ...prevQuestion,
        object: {
          ...prevQuestion.object,
          answers: dataAnswer[0]
        }
      }))
      setFlags(prevFlags => ({
        ...prevFlags,
        correctFlag: question.response === dataAnswer[1]
      }))
    }
  }, [stop])

  return (
    <motion.div
      className='Question'
    >
      <div className='question'>
        <span className='number'>
          {number}
        </span>
        {question.question}
      </div>
      <ul className='options'>
        {
          question.answers.map((option, index) => (
            <li
              className={`option
                ${index === question.response ? ' select' : ''}
                ${(typeof option.correct === 'boolean')
              ? (option.correct ? ' correct' : ' incorrect')
              : ''}
                `}
              key={index}
              onClick={() => handleClick(index)}
            >
              <span className='icon'>
                <AnimatePresence>
                  {
                    option.letter
                      ? (
                        <motion.span
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {option.letter}
                        </motion.span>
                      )
                      : (
                        option.correct
                          ? <motion.i
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='fa-solid fa-check'
                          />
                          : <motion.i
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='fa-solid fa-x'
                          />
                      )
                  }
                </AnimatePresence>
              </span>
              <p className='text'>
                {option.text}
              </p>
            </li>
          ))
        }
      </ul>
    </motion.div>
  )
}

import { Answer, Question as QuestionModel } from '@/model'
import { answerQuestion } from '@/services/answerQuestion.service'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Background } from '../Background'
import { Button } from '../Button'
import { TimeBar } from '../TimeBar'
import './styles/Question.scss'

export interface QuestionProps {
  currentQuestion: QuestionModel
  number: number
}

const Question: React.FC<QuestionProps> = ({ currentQuestion, number }) => {
  const [currentAnswer, setCurrentAnswer] = useState<Answer | undefined>(
    undefined
  )
  const [stop, setStop] = useState(false)

  const handleClick = (newAnswer: Answer) => {
    if (!stop) setCurrentAnswer(newAnswer)
  }

  useEffect(() => {
    const subscription$ = answerQuestion.getSubject()
    subscription$.subscribe((data) => {
      if (!data) {
        setStop(true)
        answerQuestion.setSubject(currentAnswer?.correct)
      }
    })

    // return () => answerQuestion.subject$.complete()
  }, [])

  return (
    <motion.div
      className="Question"
      exit={{ x: '-100%' }}
      animate={{ x: 0, transition: { duration: 0.2 } }}
      initial={{ x: '100%' }}
    >
      <Background />
      <TimeBar stop={stop} />
      <form className="form">
        <div className="question">
          <span className="number">{number}</span>
          {currentQuestion.question}
        </div>
        <ul className="options">
          {currentQuestion.answers.map((option, index) => (
            <li
              className={`option${currentAnswer === option ? ' select' : ''}${
                stop ? (option.correct ? ' correct' : ' incorrect') : ''
              }`}
              key={index}
              onClick={() => handleClick(option)}
            >
              <span className="icon">
                <AnimatePresence>
                  {option.letter ? (
                    <motion.span
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {option.letter}
                    </motion.span>
                  ) : option.correct ? (
                    <motion.i
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="fa-solid fa-check"
                    />
                  ) : (
                    <motion.i
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="fa-solid fa-x"
                    />
                  )}
                </AnimatePresence>
              </span>
              <p className="text">{option.text}</p>
            </li>
          ))}
        </ul>
        <Button currentAnswer={currentAnswer} stop={stop} setStop={setStop} />
      </form>
    </motion.div>
  )
}

export default Question

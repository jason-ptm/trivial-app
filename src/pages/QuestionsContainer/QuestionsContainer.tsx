import { transformQuestions } from '@/adapters'
import { useAsync } from '@/hooks'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { addQuestions, resetQuestions } from '@/redux/states/questions'
import store from '@/redux/store'
import { changeQuestion } from '@/services/changeQuestion.service'
import { getQuestions } from '@/services/trivialQuestions.service'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutesTypes } from '.'
import { Loading } from '../Loading'
import { Question } from './components/Question'
import './styles/QuestionsContainer.scss'
export interface QuestionsContainerProps {
  props?: boolean
}

const QuestionsContainer: React.FC<QuestionsContainerProps> = () => {
  // data fetch
  const { loading, callEndpoint } = useFetchAndLoad()
  const getApi$ = async () => await callEndpoint(getQuestions())
  const handleExit = () => {
    navigate(RoutesTypes.home)
    dispatch(resetQuestions())
  }
  const successFunction = (data: []) => {
    const result = transformQuestions(data)
    dispatch(addQuestions(result))
  }
  useAsync(getApi$, successFunction, handleExit)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const subscription$ = changeQuestion.getSubject()

  useEffect(() => {
    subscription$.subscribe((data) => {
      if (data) {
        setCurrentQuestionIndex((prev) => prev + 1)
      }
    })

    return () => {
      dispatch(resetQuestions())
    }
  }, [])

  return (
    <motion.div
      className="questionscontainer"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <AnimatePresence>
        {loading ? (
          <Loading />
        ) : store.getState().parserQuestions.length > 1 ? (
          currentQuestionIndex % 2 === 0 ? (
            <>
              <div />
              <Question
                currentQuestion={
                  store.getState().parserQuestions[currentQuestionIndex]
                }
                number={currentQuestionIndex + 1}
              />
            </>
          ) : (
            <Question
              currentQuestion={
                store.getState().parserQuestions[currentQuestionIndex]
              }
              number={currentQuestionIndex + 1}
            />
          )
        ) : (
          ''
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default QuestionsContainer

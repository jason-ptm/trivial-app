import { Answer, axiosQuestion } from '@/model'

export const transformQuestions = (questions: []) => {
  return questions.map((questObj: axiosQuestion) => ({
    question: questObj.question,
    answers: transformAnswers(
      questObj.incorrectAnswers,
      questObj.correctAnswer
    ),
  }))
}

const transformAnswers = (
  incorrectAnswers: unknown[],
  correctAnswer: unknown
): Answer[] => {
  const letters = ['a', 'b', 'c', 'd']

  const indexCorrectAnswer = Math.floor(Math.random() * 4)

  incorrectAnswers.splice(indexCorrectAnswer, 0, correctAnswer)
  return incorrectAnswers.map(
    (element, index): Answer => ({
      letter: letters[index],
      text: element as string,
      correct: index === indexCorrectAnswer,
    })
  )
}

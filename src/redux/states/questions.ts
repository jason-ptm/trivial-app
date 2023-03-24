import { Question } from '@/model'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Question[] = [
  {
    question: '',
    answers: [
      {
        letter: '',
        text: '',
        correct: false,
      },
    ],
  },
]

export const parserQuestionsSlice = createSlice({
  name: 'parserQuestions',
  initialState: initialState,
  reducers: {
    addQuestions: (state, action) => action.payload,
    resetQuestions: () => initialState,
  },
})

export const { addQuestions, resetQuestions } = parserQuestionsSlice.actions

export default parserQuestionsSlice.reducer

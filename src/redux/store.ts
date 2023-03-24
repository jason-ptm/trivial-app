import { User } from '@/model/user'
import { configureStore } from '@reduxjs/toolkit'
import { Question } from '../model'
import parserQuestionsSlice from './states/questions'
import currentUserSlice from './states/currentUser'
import usersSlice from './states/users'

export interface AppStore {
  parserQuestions: Question[]
  currentUser: User
  users: User[]
}

export default configureStore<AppStore>({
  reducer: {
    parserQuestions: parserQuestionsSlice,
    currentUser: currentUserSlice,
    users: usersSlice,
  },
})

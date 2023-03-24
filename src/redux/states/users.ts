import { LocalStorageTypes, User } from '@/model'
import {
  getLocalStorage,
  setLocalStorage,
} from '@/utilities/localStorage.utility'
import { createSlice } from '@reduxjs/toolkit'

const initialState: User[] = [
  {
    userName: 'Tu',
    points: 0,
  },
]

export const usersSlice = createSlice({
  name: 'currentUser',
  initialState: getLocalStorage(LocalStorageTypes.users)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.users))
    : initialState,
  reducers: {
    addUsers: (_state, action) => {
      setLocalStorage(LocalStorageTypes.users, action.payload)
      return action.payload
    },
  },
})

export const { addUsers } = usersSlice.actions

export default usersSlice.reducer

import { User } from '@/model'
import { createSlice } from '@reduxjs/toolkit'

const initialState: User = {
  userName: 'Tu',
  points: 0,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    addPoints: (state, action) => ({
      ...state,
      points: state.points + action.payload,
    }),
    resetUser: () => initialState,
  },
})

export const { addPoints, resetUser } = currentUserSlice.actions

export default currentUserSlice.reducer

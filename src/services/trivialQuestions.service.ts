import { loadAbort } from '@/utilities'
import axios from 'axios'

//eslint-disable-next-line
export const getQuestions = () => {
  const controller = loadAbort()
  return {
    call: axios.get(getUrl(), { signal: controller.signal }),
    controller,
  }
}

const getUrl = () => {
  const categories = [
    'arts_and_literature',
    'film_and_tv',
    'food_and_drink',
    'general_knowledge',
    'geography',
    'history',
    'music',
    'science',
    'society_and_culture',
    'sport_and_leisure',
  ]

  const random = Math.random() * 10

  return `https://the-trivia-api.com/api/questions?categories=${categories[random]}&limit=10`
}

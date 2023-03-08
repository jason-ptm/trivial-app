export default class Data {
  categories = [
    'arts_and_literature',
    'film_and_tv',
    'food_and_drink',
    'general_knowledge',
    'geography',
    'history',
    'music',
    'science',
    'society_and_culture',
    'sport_and_leisure'
  ]

  parserQuestions = []
  unparserQuestions = []

  fetchData () {
    const random = Math.random() * 10
    return fetch(`https://the-trivia-api.com/api/questions?categories=${this.categories[random]}&limit=10`)
  }

  parseAnswers (incorrectAnswers, correctAnswer) {
    const letters = ['a', 'b', 'c', 'd']
    const newAnswers = []
    incorrectAnswers.splice(Math.floor(Math.random() * 4), 0, correctAnswer)
    incorrectAnswers.forEach((e, index) => {
      newAnswers.push({
        letter: letters[index],
        text: e
      })
    })
    return newAnswers
  }

  putQuestions (data) {
    data.forEach(e => {
      this.parserQuestions.push({
        question: e.question,
        answers: this.parseAnswers(e.incorrectAnswers, e.correctAnswer),
        response: ''
      })
    })
  }

  async getData () {
    await this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.unparserQuestions = data
        this.putQuestions(data)
      })
  }

  validateQuestion (index) {
    const question = this.unparserQuestions[index]
    const indexCorrectAnswer = question.incorrectAnswers.indexOf(question.correctAnswer)
    return [this.getCheckQuestions(question, indexCorrectAnswer), indexCorrectAnswer]
  }

  getCheckQuestions (question, indexCorrectAnswer) {
    const questions = []
    question.incorrectAnswers.forEach((e, index) => {
      const check = indexCorrectAnswer === index
      questions.push({
        text: e,
        correct: check
      })
    })
    return questions
  }
}

const Questions = {
  q1: {
    text: "Where are you sitting, right now?",
    type: "multi",
    answers: [
      "Seattle",
      "Boston"
    ]
  },
  q2: {
    text: "Robot or Cowboy?",
    type: "multi",
    answers: [
      "🤖",
      "🤠"
    ]
  }
}

const map = new WeakMap()
export default class QuestionManager {
  constructor (questions=Questions) {
    map.set(this, { active: "q1", questions })
  }

  activate (id) {
    const state = map.get(this)
    map.set(this, { ...state, active: id })
  }

  get active () { return map.get(this).active }
  get activeQuestion () { return map.get(this).questions[this.active] }
  get activeAnswers () { return this.activeQuestion.answers }
}

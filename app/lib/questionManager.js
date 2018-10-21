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
const state = {}
export default class QuestionManager {
  constructor (questions=Questions) {
    map.set(state, { active: 0, questions })
  }

  activate (id) {
    map.set(state, { ...this.state, active: id })
  }

  get state () { return { ...map.get(state) } }
  get activeQuestion () { return this.state.questions[this.state.active] }
  get activeAnswers () { return this.activeQuestion.answers }
}

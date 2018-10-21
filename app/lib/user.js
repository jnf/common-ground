const map = new WeakMap()
const state = {}

export default class User {
  constructor (id) {
    map.set(state, { id })
  }

  get state () { return { ...map.get(state) } }
  get id () { return this.state.id }
}

import User from "./user"

const map = new WeakMap()
const state = {}
export default class UserManager {
  constructor () {
    map.set(state, { users: {} })
  }

  register (clientId) {
    if (this.users[clientId]) return // they're already registered
    this.update({ ...this.users, [clientId]: new User(clientId) })
  }

  unregister (clientId) {
    const users = { ...this.users }
    if (users[clientId) {
      delete users[clientId]
      map.set(state, { ...this.state, users })
    }
  }

  update (data) {
    const newState = { ...map.get(state), [data] }
    map.set(state, newState)
    console.log("update", newState)
  }

  get users () { return { ...map.get(state).users } }
}

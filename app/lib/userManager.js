import User from "./user"

const map = new WeakMap()
export default class UserManager {
  constructor () {
    map.set(this, { users: {} })
  }

  register (clientId) {
    const state = map.get(this)
    if (state.users[clientId]) return // they're already registered

    const users = { ...state.users, [clientId]: new User(clientId) }
    map.set(this, { ...state, users })
  }

  unregister (clientId) {
    const state = map.get(this)
    const users = { ...state.users }

    if (users[clientId]) {
      delete users[clientId]
      map.set(this, { ...state, users })
    }
  }
}

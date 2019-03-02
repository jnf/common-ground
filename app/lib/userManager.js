import User from "./user"

const map = new WeakMap()
export default class UserManager {
  constructor () {
    map.set(this, { users: {} })
  }

  register (clientId, socket) {
    const state = map.get(this)
    const user = state.users[clientId] || new User(clientId, socket)

    if (!state.users[clientId]) { // they haven't registered before!
      const users = { ...state.users, [clientId]: user }
      map.set(this, { ...state, users })
    }

    return user
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

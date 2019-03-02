import { BWOKEN, MISSING_METHOD } from "../bwoken"

const map = new WeakMap()
class MessageHandler {
  constructor (concerns={}) {
    map.set(this, { ...concerns }) // create an initial state
  }

  on (message, payload={}, socket={}) {
    console.log(`received controller ${message} with payload ${payload}.`)
    if (!this[message]) return MISSING_METHOD(message, "controller")
    try {
      return this[message](payload, socket)
    } catch (error) {
      return BWOKEN("controller", message, error)
    }
  }

  get state () { return map.get(this) }
}

export default MessageHandler

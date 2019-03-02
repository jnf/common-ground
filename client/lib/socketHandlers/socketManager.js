import * as io from "socket.io-client"

const map = new WeakMap()
class SocketManager {
  constructor (concerns={}) {
    // get us a socket connection
    // and add concerns to state
    map.set(this, { ...concerns, socket: io() })

    // set incoming messages to delegate to the defined instance methods
    this.state.socket.on("message", this.on.bind(this))
  }

  on (message, payload={}) {
    const [_, method] = message.split("::")
    console.log(`received message: "${method}" with payload ${Object.entries(payload)}`)
    try {
      this[method](payload) // method must be defined on the subclass
    } catch (error) {
      console.error("😵", error)
      console.table({ method, ...payload })
    }
  }

  send (message, data={}) {
    this.socket.send(message, data)
  }

  get state () { return { ...map.get(this) } } // doesn't break deep references 😒
  get socket () { return this.state.socket }
}

export default SocketManager

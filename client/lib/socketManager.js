import * as io from "socket.io-client"

const map = new WeakMap()
class SocketManager {
  constructor (messages={}) {
    // get us a socket connection, and hold onto it
    map.set(this, { socket: io() })

    // set up messages as instance methods
    Object.entries(messages).forEach(([message, method]) => this[message] = method)

    // set incoming messages to delegate to the defined instance methods
    this.state.socket.on("message", this.on.bind(this))
  }

  on (message, payload={}) {
    console.log(`received message: "${message}" with payload ${payload}`)
    try {
      this[message](payload)
    } catch (error) {
      console.error("😵", error)
      console.table(payload)
    }
  }

  send (message, data={}) {
    this.socket.send(message, data)
  }

  get state () { return { ...map.get(this) } } // doesn't break deep references 😒
  get socket () { return this.state.socket }
}

export default SocketManager

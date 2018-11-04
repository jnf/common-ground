import * as io from "socket.io-client"

const map = new WeakMap()
class SocketManager {
  constructor (callbacks={}) {
    // establish initial state
    map.set(this, { callbacks, socket: io() })

    // set up listeners for provided callbacks
    Object.keys(callbacks).forEach(key => this.socket.on(key, this.callbacks[key]))
  }

  // use the open connection to send a message to the server
  emit (message, data={}) {
    this.socket.emit(message, data)
  }

  get callbacks () { return map.get(this).callbacks }
  get socket () { return map.get(this).socket }
}

export default SocketManager

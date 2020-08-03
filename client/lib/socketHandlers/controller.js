import SocketManager from "./socketManager"
import User from "../user"

class ControllerHandler extends SocketManager {
  constructor (concerns={}) {
    // spread the instance concerns with those defined in the subclass
    // and send the whole mess to the parent class
    super({
      controller: new User({ control: true }),
      ...concerns
    })
  }

  register () {
    console.log("hi register")
    this.send("control::register", { id: this.state.controller.id })
  }

  controllerMessage (data) {
    console.log(data)
  }
}

export default ControllerHandler

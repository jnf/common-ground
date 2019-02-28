import MessageHandler from "./message"

class ControllerHandler extends MessageHandler {
  register ({ id }) {
    console.log("handling incoming controller", id)
    this.state.controllerManager.register(id)

    return {
      result: "app::controllerMessage",
      payload: {
        ok: true,
        message: "registration success",
        data: { id }
      }
    }
  }
}

export default ControllerHandler

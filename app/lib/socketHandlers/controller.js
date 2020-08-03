import MessageHandler from "./message"

class ControllerHandler extends MessageHandler {
  register ({ id }, socket) {
    console.log("handling incoming controller", id)
    this.state.controllerManager.register(id, socket)

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

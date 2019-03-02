import MessageHandler from "./message"

class ParticipantHandler extends MessageHandler {
  register ({ id }) {
    console.log("handling incoming client", id)
    this.state.userManager.register(id)

    return {
      result: "app::appMessage",
      payload: {
        ok: true,
        message: "registration success",
        data: { id }
      }
    }
  }
}

export default ParticipantHandler
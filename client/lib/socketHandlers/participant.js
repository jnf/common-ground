import SocketManager from "./socketManager"
import User from "../user"
import appMessager from "../utilities/appMessager"

class ParticipantHandler extends SocketManager {
  constructor (concerns={}) {
    // spread the instance concerns with those defined in the subclass
    // and send the whole mess to the parent class
    super({
      user: new User(),
      ...concerns
    })
  }

  register () {
    const { appMessages, user } = this.state
    appMessager( appMessages, {
      message: `registering with ${user.id}!`,
      ok: true,
      data: {}
    })

    this.send("client::register", { id: user.id })
  }

  appMessage (data) {
    appMessager(this.state.appMessages, data)
  }

}

export default ParticipantHandler

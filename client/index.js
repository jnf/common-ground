import SocketManager from "./lib/socketManager"
import appMessager from "./lib/utilities/appMessager"
import User from "./lib/user"

document.addEventListener("DOMContentLoaded", () => {
  const user = new User()
  const appMessages = document.getElementById("app-messages")
  const socketManager = new SocketManager({
    "message": (message, data) => appMessager(appMessages, data),
    "app::register": () => {
      appMessager(appMessages, {
        message: `registering with ${user.id}!`,
        ok: true,
        data: {}
      })
      socketManager.send("client::register", { id: user.id })
    }
  })

})

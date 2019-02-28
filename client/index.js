import SocketManager from "./lib/socketManager"
import AppMessager from "./lib/utilities/appMessager"
import User from "./lib/user"

document.addEventListener("DOMContentLoaded", () => {
  const user = new User()
  const appMessages = document.getElementById("app-messages")
  const socketManager = new SocketManager({
    "app::appMessage": (data) => AppMessager(appMessages, data),
    "app::register": () => {
      console.log(`registering with ${user.id}!`)
      socketManager.emit("client::register", { id: user.id })
    }
  })

})

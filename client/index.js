import SocketManager from "./lib/socketManager"
import User from "./lib/user"

document.addEventListener("DOMContentLoaded", () => {
  const user = new User()
  const appMessages = document.getElementById("app-messages")

  // here's what listeners should look like:
  // {
      // "chat:app:register": () => {
      //   socketManager.emit("chat:client:register", {id: user.id})
      // }
  // }
  const socketManager = new SocketManager({})
})

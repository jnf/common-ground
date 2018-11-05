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
  const socketManager = new SocketManager({
    "app::register": () => {
      console.log(`registering with ${user.id}!`)
      socketManager.emit("client::register", { id: user.id })
    },

    "app:appMessage": ({message, data}) => {
      console.log(message, data)
    }
  })
})

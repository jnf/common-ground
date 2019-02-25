import SocketManager from "./lib/socketManager"
import User from "./lib/user"

document.addEventListener("DOMContentLoaded", () => {
  console.log("hi ❤️")

  const controller = new User({ control: true })

  const socketManager = new SocketManager({
    "app::register": () => {
      console.log(`registering controller with ${controller.id}!`)
      socketManager.emit("control::register", { id: controller.id })
    }
  })
})

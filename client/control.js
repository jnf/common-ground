import SocketManager from "./lib/socketManager"
import User from "./lib/user"

document.addEventListener("DOMContentLoaded", () => {
  console.log("hi ❤️")

  const controller = new User({ control: true })

  const socketManager = new SocketManager({
    "message": (message, payload) => console.log("generic message", message, payload),
    "app::controllerMessage": data => console.log(data),
    "app::register": () => {
      console.log(`registering controller with ${controller.id}!`)
      socketManager.send("control::register", { id: controller.id })
    }
  })
})

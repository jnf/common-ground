import SocketManager from "./lib/socketManager"
import User from "./lib/user"

document.addEventListener("DOMContentLoaded", () => {
  const user = new User()
  const socketManager = new SocketManager({
    "chat:app:register": () => {
      socketManager.emit("chat:client:register", {id: user.id})
    },
    "chat:message:receive": (response) => {
        const content = document.createElement("li")
        content.innerText = response
        messages.appendChild(content)
    },
    "chat:user:connected": (name) => {
      const content = document.createElement("li")
      content.classList.add("system-message")
      content.innerText = `${name} connected`
      messages.appendChild(content)
    },
    "chat:client:disconnected": (response) => {
      const content = document.createElement("li")
      content.classList.add("system-message")
      content.innertext = `${response} disconnected`
      messages.appendChild(content)
    },
  })

  talker.addEventListener("submit", (event) => {
    event.preventDefault()
    socketManager.emit('chat:message:send', {
      message: message.value,
      id: user.id
    })

    message.value = ""
  })
})

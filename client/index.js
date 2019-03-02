import ParticipantHandler from "./lib/socketHandlers/participant"

document.addEventListener("DOMContentLoaded", () => {
  const appMessages = document.getElementById("app-messages")
  new ParticipantHandler({ appMessages })
})

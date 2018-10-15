const app = require("express")()
const http = require("http").Server(app)
const io = require("socket.io")(http)

import { v1 as uuid } from "uuid"
import path from "path"

// inject webpack middleware
import webpackMiddleware from "webpack-dev-middleware"
import webpack from "webpack"
import config from "../webpack.config.dev"
app.use(webpackMiddleware(webpack(config)))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"))
})

io.on("connection", (socket) => {
  // tell client we are connected; this should trigger a register event
  socket.emit('chat:app:register')

  socket.on("disconnect", (data) => {
    console.log("disconnected", data)
    io.emit("chat:client:disconnected", data)
  })

  socket.on("chat:client:register", ({id}) => {
    io.emit("chat:user:connected", id)
  })

  socket.on("chat:message:send", ({id, message}) => {
    io.emit("chat:message:receive", `${id}: ${message}`)
  })
})

http.listen(3000, () => {
  console.log("listening on *:3000")
})

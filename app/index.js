import Express from "express"
import path from "path"

// everybody loves middlewares
import sassMiddleware from "node-sass-middleware"
import webpackMiddleware from "webpack-dev-middleware"
import webpack from "webpack"
import webpackConfig from "../webpack.config.dev"

// who manages the managers?
// import QuestionManager from "lib/questionManager"
// import UserManager from "lib/userManager"

// can http pls
const app = Express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

// inject sass middleware
app.use(sassMiddleware({
  outputStyle: "compressed",
  src: path.join(__dirname, "../client")
}))
app.use("/public", Express.static(path.join(__dirname, "../client/public")))

// inject webpack middleware
app.use(webpackMiddleware(webpack(webpackConfig)))

// managers gonna manage
// const questionManager = new QuestionManager
// const userManager = new UserManager

// serve the landing page for participants
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/index.html")))

// invoke socket handler
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
})

// shh... I'm tryna listen
http.listen(3000, () => {
  console.log("listening on *:3000")
})

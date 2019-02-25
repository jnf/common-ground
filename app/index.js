import Express from "express"
import path from "path"

// everybody loves middlewares
import sassMiddleware from "node-sass-middleware"
import webpackMiddleware from "webpack-dev-middleware"
import webpack from "webpack"
import webpackConfig from "../webpack.config.dev"

// who manages the managers?
// import QuestionManager from "lib/questionManager"
import UserManager from "./lib/userManager"

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
app.use(webpackMiddleware(webpack(webpackConfig), { publicPath: "/" }))

// managers gonna manage
// const questionManager = new QuestionManager
const userManager = new UserManager

// serve the landing page for participants
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/index.html")))

// serve a control page for presenter(s)
app.get("/control", (req, res) => res.sendFile(path.join(__dirname, "../client/control.html")))

// invoke socket handler
// messages FROM the client TO the app use the "client" namespace ("client::register")
// messages FROM the app TO the client use the "app" namespace ("app::ready")
io.on("connection", (socket) => {
  // tell client we are connected; this should trigger a register event
  socket.emit('app::register')

  socket.on("disconnect", (data) => {
    // tell the UserManager that the person disconnected

    // do we need to tell anyone else that person disconnected?
    // socket.broadcast.emit("app::clientDisconncted", {})
  })

  socket.on("client::register", ({ id }) => {
    // this is where we create a User instance
    const user = userManager.register(id)

    socket.emit("app::appMessage", {
      message: "registration success",
      data: { id: user.id }
    })

    // do we need to tell anyone that registration happened?
    // io.emit("app::clientRegistered", {})
  })

  socket.on("control::register", ({ id }) => {
    console.log("incoming controller", id)
  })
})

// shh... I'm tryna listen
http.listen(3000, () => console.log("Shh! I'm listening on *:3000"))

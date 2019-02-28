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

// also who, uh, handles the handlers?
import ControllerHandler from "./lib/socketHandlers/controller"
import ClientHandler from "./lib/socketHandlers/client"

// sometimes things go wrong
import { BWOKEN } from "./lib/bwoken"

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
const userManager = new UserManager()
const controllerManager = new UserManager()

// handlers gotta handle (within their namespace)
const namespaces = {
  control: new ControllerHandler({ controllerManager }),
  client: new ClientHandler({ userManager })
}

// serve the landing page for participants
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/index.html")))

// serve a control page for presenter(s)
app.get("/control", (req, res) => res.sendFile(path.join(__dirname, "../client/control.html")))

// invoke socket handler
io.on("connection", (socket) => {
  // tell client we are connected; this should trigger a register event
  socket.emit('app::register')

  socket.on("message", (clientMessage, clientData) => {
    const [namespace, method] = clientMessage.split("::")
    try {
      const handler = namespaces[namespace]
      const { result, payload } = handler.on(method, clientData)
      socket.send(result, payload)
    } catch (error) {
      const { result, payload } = BWOKEN(namespace, method, error)
      socket.send(result, payload)
    }
  })
})

// shh... I'm tryna listen
http.listen(3000, () => console.log("Shh! I'm listening on *:3000"))

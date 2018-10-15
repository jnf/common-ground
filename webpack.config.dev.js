import webpack from "webpack"
import path from "path"

export default {
  devtool: "inline-source-map",
  mode: "development",
  entry: [
    path.resolve(__dirname, "client/index.js")
  ],

  output: {
    path: path.resolve(__dirname, "client"),
    publicPath: "/",
    filename: "bundle.dev.js"
  }
}

import webpack from "webpack"
import path from "path"

export default {
  devtool: "inline-source-map",
  mode: "development",
  entry: {
    index: [path.resolve(__dirname, "client/index.js")],
    control: [path.resolve(__dirname, "client/control.js")]
  },

  output: {
    path: path.resolve(__dirname, "client"),
    publicPath: "/",
    filename: "[name].js"
  }
}

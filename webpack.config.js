const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve("src/index.js"),
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve("dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.glsl$/,
        use: ["glslify-loader"],
        type: "asset/source",
      },
    ],
  },
};

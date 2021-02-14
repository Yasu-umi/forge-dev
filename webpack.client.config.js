const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
  devtool: "inline-source-map",
  entry: {
    login: path.resolve(__dirname, "src/client/login.tsx"),
    root: path.resolve(__dirname, "src/client/root.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: "ts-loader",
        options: { configFile: "tsconfig.client.json" },
      }],
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

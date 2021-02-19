const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
  target: "node",
  devtool: "inline-source-map",
  entry: {
    main: path.resolve(__dirname, "/src/server/main.ts"),
    lambda: path.resolve(__dirname, "/src/server/lambda.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "handler",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    fallback: { util: require.resolve("util/") },
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.server.json" })],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: "ts-loader",
        options: { compiler: "ttypescript", configFile: "tsconfig.server.json" },
      }],
    }]
  },
};

const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
  target: "node",
  devtool: "inline-source-map",
  entry: {
    test: path.resolve(__dirname, "/src/server/test.ts"),
    app: path.resolve(__dirname, "/src/server/app.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    fallback: { util: require.resolve("util/") },
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
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
      "process.env.CLIENT_SCRET": JSON.stringify(process.env.CLIENT_SCRET),
      "process.env.HOST": JSON.stringify(process.env.HOST),
    }),
  ],
};

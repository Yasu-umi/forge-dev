const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
  target: "node",
  devtool: "inline-source-map",
  entry: {
    test: path.resolve(__dirname, "/src/server/test.ts"),
    main: path.resolve(__dirname, "/src/server/main.ts"),
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
};

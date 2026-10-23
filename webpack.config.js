const path = require("path");
const { existsSync } = require("node:fs");
const { loadEnvFile } = require("node:process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { homepage } = require("./package.json");

const localEnvPath = path.resolve(__dirname, ".env.local");
if (existsSync(localEnvPath)) {
  loadEnvFile(localEnvPath);
}

module.exports = (_env, argv = {}) => {
  const isProduction = argv.mode === "production";
  const publicPath = process.env.PUBLIC_URL ||
    (isProduction ? new URL(homepage).pathname : "/");

  return {
    entry: "./src/index.js",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: publicPath.endsWith("/") ? publicPath : `${publicPath}/`,
      clean: true,
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
        { test: /\.css$/i, use: ["style-loader", "css-loader"] },
        { test: /\.(png|jpe?g|gif|svg|ico)$/i, type: "asset/resource" },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new DefinePlugin({
        "process.env.NASA_API_KEY": JSON.stringify(process.env.NASA_API_KEY || "DEMO_KEY"),
      }),
    ],
    devServer: {
      static: { directory: path.join(__dirname, "public") },
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },
  };
};

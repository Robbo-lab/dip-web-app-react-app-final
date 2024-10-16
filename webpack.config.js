const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Ensure 'dist/' is the output folder
    clean: true, // Automatically clean old files from dist/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML template from public folder
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"), // Ensure absolute path is used
          to: ".", // Copy to the root of dist/
          globOptions: {
            ignore: ["**/index.html"], // Avoid copying the template twice
          },
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serve from 'dist/'
    },
    compress: true,
    port: 3000, // Development server on port 3000
  },
};

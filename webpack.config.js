/* eslint-disable */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const PostCSSInputRange = require("postcss-input-range");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "app.bundle.js",
    // path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [new Autoprefixer(), new PostCSSInputRange()]
            }
          },
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/styles/_colors.scss']
            }
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  devtool: "source-map",
  resolve: {
    extensions: [".jsx", ".js"]
  }
};

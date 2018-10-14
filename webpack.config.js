/* eslint-disable */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const PostCSSInputRange = require("postcss-input-range");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssNanoPlugin = require("cssnano");

module.exports = (env, argv) => {
  let devMode = argv['mode'] === 'development';

  return {
    entry: './src/index.js',
    output: {
      filename: "app.bundle.js",
      path: path.resolve(__dirname, "dist"),
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
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: devMode ? [new Autoprefixer(), new PostCSSInputRange()] : [new Autoprefixer(), new PostCSSInputRange(), new CssNanoPlugin()]
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
      new CleanWebpackPlugin(["dist"]),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      })
    ],
    devServer: {
      historyApiFallback: true
    },
    devtool: "source-map",
    resolve: {
      extensions: [".jsx", ".js"]
    }
  }
};

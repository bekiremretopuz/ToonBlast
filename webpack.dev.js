const common = require("./webpack.common");
const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const outputDir = "dist";
const publicPath = "./";
const tsConfig = "tsconfig.dev.json";
module.exports = merge(common, {
  devtool: "",
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: "[name].bundle.js",
    publicPath: publicPath,
    crossOriginLoading: "anonymous",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: tsConfig,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: false,
              sass: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: path.resolve(__dirname, "assets"),
            destination: path.resolve(__dirname, outputDir) + "/assets",
          },
        ],
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, outputDir),
    compress: false,
    host: "0.0.0.0",
    port: 9000,
    publicPath: publicPath,
    https: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
});

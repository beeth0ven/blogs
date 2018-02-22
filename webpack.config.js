const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js",
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "env",
              "stage-0",
              "react"
            ]
          }
        }
      }
    ]
  }
};
const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "../public"),
    historyApiFallback: true,
    port: process.env.PORT ?? 3000,
    open: true,
    hot: true,
    allowedHosts: "all"
  },
  plugins: [
    ...common.plugins,
    new WebpackMildCompile(),
  ]
});
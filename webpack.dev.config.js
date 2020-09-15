const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: '.dist',
    port: 9999,
    overlay: true,
    open: true,
    // openPage: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

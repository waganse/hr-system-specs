const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
// const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;

module.exports = merge(common, {
  mode: 'production',
  // plugins: [
  //   new CriticalPlugin({
  //     src: 'index.html',
  //     inline: true,
  //     minify: true,
  //     dest: 'index.html'
  //   })
  // ]
});

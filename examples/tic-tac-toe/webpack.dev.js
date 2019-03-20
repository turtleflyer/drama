/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
/* eslint-enable */

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
});

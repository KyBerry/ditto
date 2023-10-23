const path = require('path')

module.exports = {
  extends: path.resolve(__dirname, './webpack.base.config.js'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
  },
}

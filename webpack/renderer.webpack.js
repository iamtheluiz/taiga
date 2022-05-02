const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: require('./rules.webpack'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RELEASE_GREETING_MESSAGE': JSON.stringify(process.env.RELEASE_GREETING_MESSAGE),
      'process.env.TAIGA_DEFAULT_IMAGE': JSON.stringify(process.env.TAIGA_DEFAULT_IMAGE)
    })
  ]
}
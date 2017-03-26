var ip = require('ip');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'client'),
  devServer: {
    historyApiFallback: true
  },
  entry: [
    'webpack-dev-server/client?http://' + ip.address() + ':8090',
    './index.html',
    './index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          cacheDirectory: 'babel-cache',
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(eot|html|ico|jpg|png|svg|ttf|txt|woff|woff2|xml)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'Promise': 'es6-promise',
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
}

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    '@babel/polyfill',
    '@babel/register',
    'webpack-dev-server/client?http://localhost:3002',
    '../src/client/index.js',
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      shared: resolve(__dirname, '../src/client/shared/'),
    },
  },
  context: resolve(__dirname, '../src'),
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'dist/[name].bundle.js',
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, '../dist'),
    historyApiFallback: true,
    disableHostCheck: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: '../src/client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'API_HOST': 'http://localhost:3001'
      }
    })
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
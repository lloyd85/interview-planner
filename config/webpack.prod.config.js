const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: resolve(__dirname, '../src/client/index.js'),
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      shared: resolve(__dirname, '../src/client/shared/'),
    },
  },
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
        loader: [
          'babel-loader',
        ],
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
    ],
  },
  plugins: [
    // new CleanWebpackPlugin('dist', { root: resolve(__dirname, '../') }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/client/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 7,
        warnings: true,
      },
    }),
    // new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_HOST': 'https://catbook-api.herokuapp.com'
      }
    })
  ],
  /*externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },*/
};

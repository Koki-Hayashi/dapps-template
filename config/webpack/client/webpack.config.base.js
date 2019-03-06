const path = require('path');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const webpack = require('webpack');
const config = require('config');

module.exports = {
  target: 'web',
  entry: ['babel-regenerator-runtime', 'babel-polyfill', './src/client'],
  output: {
    path: path.resolve(__dirname, '../../../public/js'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
  },
  module: {
    exprContextCritical: false, // suppress warning
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-flow-strip-types',
                'transform-decorators-legacy',
                'transform-export-extensions',
              ],
              presets: ['flow', 'react', 'stage-2'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_CONFIG': JSON.stringify(JSON.stringify(config)),
    }),
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty',
    __dirname: true,
  },
  watchOptions: {
    ignored: ['src/server/**/*.js', 'node_modules'],
  },
};

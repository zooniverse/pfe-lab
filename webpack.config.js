const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nib = require('nib');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SplitByPathPlugin = require('webpack-split-by-path');

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: '',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('staging'),
    }),
    new DashboardPlugin({ port: 3777 }),
    new SplitByPathPlugin([{
      name: 'vendor',
      path: path.join(__dirname, 'node_modules'),
    }]),
    new webpack.LoaderOptionsPlugin({
      stylus: {
        default: {
          use: [nib()],
          import: ['~nib/lib/nib/index.styl']
        }
      }
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: ['.', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
        loader: 'file-loader',
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['./node_modules', './node_modules/grommet/node_modules']
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  node: {
    fs: 'empty'
  }
};

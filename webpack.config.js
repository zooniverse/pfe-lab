const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nib = require('nib');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'cheap-module-source-map',

  mode: 'development',

  devServer: {
    allowedHosts: [
      '.zooniverse.org'
    ],
    historyApiFallback: true,
    host: process.env.HOST || 'localhost',
    client: {
      overlay: true,
      progress: true
    },
    open: true,
    port: 3737,
    server: 'https'
  },

  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.HEAD_COMMIT': JSON.stringify(process.env.HEAD_COMMIT)
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: '',
    }),
    new DashboardPlugin({ port: 3777 })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: ['.', 'node_modules'],
    fallback: {
      fs: false,
      // for markdown-it plugins
      path: require.resolve("path-browserify"),
      util: require.resolve("util"),
      url: require.resolve("url"),
      process: false,
    }
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
        type: 'asset/resource'
      },
      {
        test: /\.(ico\d?)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                use: ['nib']
              }
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            import: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const nib = require('nib');

module.exports = {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    allowedHosts: [
      'localhost',
      'local.zooniverse.org'
    ],
    client: {
      overlay: true,
    },
    historyApiFallback: true,
    open: true,
    port: 3737,
    server: 'https',
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.HEAD_COMMIT': JSON.stringify(process.env.HEAD_COMMIT)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      gtm: '',
      inject: 'body',
      template: 'src/index.tpl.html',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new DashboardPlugin({ port: 3777 })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"), // for markdown-it plugins
      punycode: require.resolve("punycode/"), // for markdown-it plugins
      url: false,
      util: false,
    },
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
        type: 'asset/resource',
      },
      {
        test: /\.(ico\d?)$/,
        use: 'file-loader?name=[name].[ext]',
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
                use: [nib()]
              }
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              import: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, './node_modules'),
                ],
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

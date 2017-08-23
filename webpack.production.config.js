/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const nib = require('nib');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: '<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-WDW6V4" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-WDW6V4");</script>',
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].min.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new SplitByPathPlugin([{
      name: 'vendor',
      path: path.join(__dirname, 'node_modules'),
    }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
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
    extensions: ['.js', '.jsx', '.styl', '.css'],
    modules: ['.', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
               includePaths: [path.resolve(__dirname, './node_modules/zoo-grommet/dist'), path.resolve(__dirname, './node_modules/zooniverse-react-components/lib/zooniverse-react-components.css')]
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }]
        }),
      },
      {
        test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
        use: ['file-loader', {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true
          }
        }],
      },
    ],
  },

  node: {
    fs: 'empty'
  }
};

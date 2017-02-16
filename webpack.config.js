const webpack            = require('webpack');
const path               = require('path');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

const publicPath         = '/public/assets';
const cssName            = 'style.min.css';
const jsName             = 'bundle.js';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  }),
  new ExtractTextPlugin(cssName, {disable: NODE_ENV !== 'production'}),
];

if (NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'assets' ], {
      root: path.join(__dirname, 'public'),
      verbose: true,
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings:     false,
        drop_console: true,
        unsafe:       true
      }
    })
  );
}

module.exports = {
  entry: './src/main.js',
  debug: NODE_ENV !== 'production',
  resolve: {
    root:               path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.jsx']
  },
  plugins,
  output: {
    path: `${__dirname + publicPath}`,
    filename: jsName,
    publicPath
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style" , "css?minimize!autoprefixer?browsers=last 2 versions!sass")
      }, { 
        test: /\.js?$/, 
        loaders: ['react-hot', 'babel'], exclude: [/node_modules/, /public/] 
      }, {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2|)$/,
        loader: 'file?name=img/[name].[ext]'
      }, {
        test: /\.wav$/,
        loader: 'file?name=sounds/[name].[ext]'
      }
    ],
    eslint: {
    configFile: './.eslintrc',
    failOnError: false,
    failOnWarning: false,
    emitWarning: true
    }
  },
  devtool: NODE_ENV !== 'production' ? 'source-map' : null
};
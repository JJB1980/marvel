const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = function (_, {mode}) {
  const theme = process.env.SITE || 'default'
  const isProduction = mode === 'production'

  const plugins = []
  const rules = [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {loader: 'css-loader', options: {url: false, sourceMap: true}},
        {loader: 'sass-loader', options: {sourceMap: true}}
      ]
    }
  ]

  plugins.push(
    new MiniCssExtractPlugin({
      filename: isProduction ? 'style.[hash].css' : 'style.css'
    })
  )

  let templateArgs
  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    templateArgs = {
      theme,
      environment: mode
    }
  } else {
    templateArgs = {
      theme: '{{theme}}',
      environment: '{{environment}}'
    }
  }

  plugins.push(new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    inject: 'body',
    minify: false,
    templateParameters: {
      ...templateArgs
    }
  }))

  rules.push(
    {
      test: /\.html$/,
      loader: 'mustache-loader'
    }
  )

  return {
    entry: {
      main: './src/index.jsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'main.[chunkhash].js' : 'main.js'
    },
    module: {
      rules
    },
    plugins,
    resolve: {
      extensions: ['*', '.js', '.jsx', '.scss']
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      },
      hot: true
    }
  }
}

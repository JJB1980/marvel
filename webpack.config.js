const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
// const fs = require('fs')

const plugins = []
const rules = []

module.exports = (mode) => {
  const theme = process.env.SITE || 'default'
  const environment = mode

  plugins.push(new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    inject: 'body',
    templateParameters: {
      theme,
      environment
    }
  }))

  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  )

  return {
    entry: {
      main: './src/index.jsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'mustache-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {minimize: true}
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {url: false, sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        }
      ].concat(rules)
    },
    plugins,
    resolve: {
      extensions: ['*', '.js', '.jsx', '.scss']
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      }
    }
  }
}

const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
      filename: 'style.css'
    })
  )

  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())

    plugins.push(new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: 'body',
      minify: false,
      templateParameters: {
        theme,
        environment: mode
      }
    }))

    rules.push(
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {minimize: true}
      //     }
      //   ]
      // },
      {
        test: /\.html$/,
        loader: 'mustache-loader'
      }
    )
  } else {
    plugins.push(
      CopyWebpackPlugin([
        {from: './src/index-prod.html', to: 'index.html'}
      ])
    )
  }

  return {
    entry: {
      main: './src/index.jsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
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

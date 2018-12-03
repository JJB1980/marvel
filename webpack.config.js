const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

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

  const copyRules = [{
    from: './assets/**/*',
    to: './'
  }]

  plugins.push(
    new MiniCssExtractPlugin({
      filename: isProduction ? 'assets/style.[hash].css' : 'style.css'
    })
  )

  if (process.env.ANALYZE) plugins.push(new BundleAnalyzerPlugin())

  let templateArgs
  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())

    const configs = fs.readdirSync('./sites')
    configs.forEach(cfg => {
      if (fs.existsSync(path.resolve('./sites', cfg, 'assets'))) {
         copyRules.push({
          from: path.resolve('./sites', cfg, 'assets'),
          to: './'
        })
      }
    })

    templateArgs = {
      theme,
      environment: mode,
      name: 'DevMode',
      renderedHtml: ''
    }
  } else {
    templateArgs = {
      theme: '{{theme}}',
      environment: '{{environment}}',
      renderedHtml: '{{renderedHtml}}',
      name: '{{name}}'
    }
  }

  plugins.push(new CopyWebpackPlugin(copyRules))

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
      filename: isProduction ? 'assets/[name].[chunkhash].js' : 'main.js'
    },
    module: {
      rules
    },
    plugins,
    resolve: {
      extensions: ['*', '.js', '.jsx', '.scss']
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
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

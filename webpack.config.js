const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.bundle.js'
  },
  mode: 'development',
  plugins: [
	new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),  
    new HtmlWebpackPlugin({
		filename: "index.html",
		template: './src/templates/index.html',
	}),
	new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets'}
	])
  ],
  module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
      ]
    },
}
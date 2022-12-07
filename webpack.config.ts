import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: './server/index.ts',
  module: {
    rules: [
      {
        test: /\.(m?ts|js)x?$/,
        exclude: /node_modules/,
        use: { loader: 'swc-loader' }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|woff|svg|eot|ttf|woff2)$/,
        loader: 'url-loader',
        options: { limit: 8192, name: 'images/[name].[ext]' }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.png'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: { publicPath: path.join(__dirname, 'dist') },
    historyApiFallback: true,
    compress: true,
    port: 4000
  }
};

export default config;

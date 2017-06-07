const { join } = require('path');
const nodeExternals = require('webpack-node-externals');

const { AotPlugin } = require('@ngtools/webpack');

const DIR = join(process.cwd(), 'src', 'server');
const APP_DIR = join(DIR, '..', 'app');

module.exports = {
  context: DIR,
  entry: { server: './server.ts' },
  target: 'node',
  externals: [
    nodeExternals({ whitelist: [] })
  ],
  output: {
    path: join(process.cwd(), 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, include: [DIR], use: { loader: 'ts-loader' } },
      { test: /\.ts$/, include: [APP_DIR], use: { loader: '@ngtools/webpack' } },
      { test: /\.html$/, include: [APP_DIR], use: [ 'html-loader' ] },
      {
        test: /\.scss$/, include: [APP_DIR], use: [
        'exports-loader?module.exports.toString()',
        'css-loader',
        'sass-loader'
      ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?name=/assets/fonts/[name].[hash].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader?limit=10000&name=/assets/images/[name].[hash].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      images: `${APP_DIR}/images`
    }
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: join(APP_DIR, 'tsconfig.json'),
      skipCodeGeneration: false
    })
  ]
};

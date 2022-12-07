module.exports = {
  entry: './server/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '.build')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader'
        }
      }
    ]
  }
};

module.exports = {
  // ...
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      // other rules
    ],
  },
  // ...
};

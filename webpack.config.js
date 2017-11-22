module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: './dist',
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    inline: true,
    port: 3000,
    contentBase: './dist'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: 'babel',
        query: {
          presets: ['es2015', 'state-0', 'react']
        }
      }
    ]
  }
};
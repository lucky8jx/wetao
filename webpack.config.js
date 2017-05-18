module.exports = {
  entry: {
    homePage: './client/homepage/index.js',
    logIn: './client/logIn/index.js',
    signUp: './client/signUp/index.js',
    message: './client/message/index.js',
    newMessage: './client/message/new/index.js'
  },
  output: {
    path: __dirname + "/public/js/",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  }
};
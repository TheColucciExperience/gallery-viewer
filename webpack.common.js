
// Getting all necessary loaders and plugins

const path = require( 'path' ),  
  HtmlWebpackPlugin = require( 'html-webpack-plugin' ),  
  CopyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports = {
  entry: {
    app: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ 'html-loader' ]
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [    
    new HtmlWebpackPlugin( {
      title: 'Gallery Viewer',
      template: 'src/index.html',
      inject: false
    } ),
    new CopyWebpackPlugin( [
      { from: 'src/images/', to: './images' }
    ] )
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve( __dirname, 'dist' )
  }
}

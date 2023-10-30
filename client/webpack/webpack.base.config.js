const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname + '../dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/preset-env', 'solid', '@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-transform-class-properties',
              '@babel/plugin-transform-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@/assets': path.resolve(__dirname, '../src/assets'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/pages': path.resolve(__dirname, '../src/pages'),
      '@/contexts': path.resolve(__dirname, '../src/contexts'),
      '@/routes': path.resolve(__dirname, '../src/routes'),
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
      '@/gql': path.resolve(__dirname, '../src/gql'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require('webpack');

module.exports = {
  output: {
    publicPath: "/",
  },
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { "runtime": "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico"
    }),
    new CopyPlugin({
      patterns: [
          { from: "src/assets", to: "assets" },
          { from: "public/_redirects", to: "." },
      ],
  }),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY),
      'process.env.DEMO_MODE': JSON.stringify(process.env.DEMO_MODE || 'false')
    }),
  ],
}

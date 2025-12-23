const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Detect if we're in production
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProduction ? "js/[name].[contenthash].js" : "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      // SVGs (as before)
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // favicon: "./public/favicon.ico", // optional
    }),
    // Only add MiniCssExtractPlugin in production
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
          }),
        ]
      : []),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    open: true,
    hot: true,
  },
  mode: isProduction ? "production" : "development",
};

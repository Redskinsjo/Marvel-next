require("dotenv").config();

module.exports = {
  env: {
    REACT_APP_SERVER_URL:
      process.env.REACT_APP_SERVER_URL_DEV ||
      process.env.REACT_APP_SERVER_URL_PRODUCTION,
    REACT_APP_DATA_API: process.env.REACT_APP_DATA_API,
  },
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  images: {
    domains: ["i.annihil.us"],
  },
};

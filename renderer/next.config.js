const withCSS = require("@zeit/next-css");
const webpack = require("webpack");

module.exports = withCSS({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  webpack: config => {
    config.target = "electron-renderer";
    config.externals = config.externals || [{ sqlite3: "commonjs sqlite3" }];
    config.plugins.push(
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify("5fa3b9"),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
        "typeof window": JSON.stringify("object"),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        NICE_FEATURE: JSON.stringify(true),
        EXPERIMENTAL_FEATURE: JSON.stringify(false)
      })
    );

    config.module.rules = [
      ...(config.module.rules || []),
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader?limit=100000"
      }
    ];

    return config;
  }
});

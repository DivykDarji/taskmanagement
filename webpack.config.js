const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        util: require.resolve("util/"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        url: require.resolve("url/"),
        assert: require.resolve("assert/")
      };
      return webpackConfig;
    }
  }
};

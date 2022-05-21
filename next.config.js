module.exports = {
  trailingSlash: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@svgr/webpack",
        },
      ],
    });

    return config;
  },
};

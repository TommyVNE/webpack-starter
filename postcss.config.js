module.exports = {
  plugins: [
    "postcss-import",
    [
      "postcss-preset-env",
      {
        stage: 2,
        features: {
          "logical-properties-and-values": false,
        },
        browsers: "last 2 versions",
      },
    ],
    "autoprefixer",
    "cssnano",
  ],
};

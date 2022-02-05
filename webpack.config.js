const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webpackConfigMode = mode => require(`./build-utils/webpack.${mode}`)();

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode = "production" }) => {
  const isProduction = mode === "production";

  return merge(
    {
      entry: ["./src/index.js", "./src/scss/style.scss"],
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
      },
      mode: isProduction ? "production" : "development",
      devtool: isProduction ? "source-map" : "eval-source-map",
      module: {
        rules: [
          // Images
          {
            test: /\.(jpe?g|png|gif|svg|webp|avif)$/i,
            type: "asset/resource",
            generator: { filename: isProduction ? "assets/images/[hash][ext]" : "assets/images/[name][ext]" },
          },

          // Fonts
          {
            test: /\.(woff2?|ttf|eot|fnt)$/i,
            type: "asset/resource",
            generator: { filename: isProduction ? "assets/fonts/[hash][ext]" : "assets/fonts/[name][ext]" },
          },

          // Shaders (?)
          {
            test: /\.(glsl|vs|fs|vert|frag)$/i,
            type: "asset/source",
            generator: { filename: isProduction ? "assets/shaders/[hash][ext]" : "assets/shaders/[name][ext]" },
          },

          // Pug (?)
          {
            test: /\.(pug)$/i,
            use: ["pug-loader"],
          },

          // Javascprit ES6+
          {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env"] },
              },
            ],
          },
        ],
      },
      plugins: [new HtmlWebpackPlugin({ template: "src/index.html" }), new webpack.ProgressPlugin()],
    },
    webpackConfigMode(mode)
  );
};

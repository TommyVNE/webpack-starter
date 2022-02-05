module.exports = () => {
    const CopyWebpackPlugin = require("copy-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    return {
        devtool: "source-map",

        // CSS, Sass, Scss and PostCSS
        module: {
            rules: [
                {
                    test: /\.(s[ac]ss|css)$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
            ],
        },

        plugins: [
            new CopyWebpackPlugin({ patterns: [{ from: "src/static", to: "", noErrorOnMissing: true }] }),
            new MiniCssExtractPlugin({ filename: "style.css" }),
        ],
    };
};

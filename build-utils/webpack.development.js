const path = require("path");

module.exports = () => ({
    devtool: "eval-source-map",

    // CSS, Sass, Scss and PostCSS
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            },
        ],
    },

    devServer: {
        open: true,
        static: [{ directory: path.join(__dirname, "dist"), watch: true }],
        watchFiles: ["src/**/*", "dist/**/*"],
        hot: true
    },
});

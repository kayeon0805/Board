const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: "minesearch-dev",
    mode: "development",
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    entry: {
        app: "./client",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: ["last 2 chrome versions"],
                                },
                                debug: true,
                            },
                        ],
                        "@babel/preset-react",
                    ],
                    plugins: [
                        "react-refresh/babel",
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        [
                            "@babel/plugin-proposal-class-properties",
                            { loose: true },
                        ],
                    ],
                },
                exclude: path.join(__dirname, "node_modules"),
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [new ReactRefreshWebpackPlugin()],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/dist",
    },
    devServer: {
        devMiddleware: { publicPath: "/dist" },
        static: { directory: path.resolve(__dirname) },
        hot: true,
        historyApiFallback: true,
    },
};

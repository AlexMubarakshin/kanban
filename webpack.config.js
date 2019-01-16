const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");

const buildConfig = {
    entry: {
        "app": "./src/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "./build/"),
        filename: "[name].js",
        publicPath: "dist"
    },
    devServer: {
        overlay: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: '/node-modules'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: '/node-modules'
            }
        ],
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i
            }),
        ]
    }
};

module.exports = (env, options) => {
    const production = options.mode === "production";
    buildConfig.devtool = production ? false : "eval-sourcemap"

    const isNeedAnalyze = env && env.analyze;
    if (isNeedAnalyze) {
        buildConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 3002 }));
    }

    // if (production) {
    //     buildConfig.optimization.minimizer.push(new UglifyJsPlugin());
    // }

    return buildConfig;
};

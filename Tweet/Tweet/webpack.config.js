const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


let cssTransformerSeq = [{
    loader: 'css-loader', // translates CSS into CommonJS modules
}, {
    loader: 'postcss-loader', // Run post css actions
    options: {
        plugins: function () { // post css plugins, can be exported to postcss.config.js
            return [
                require('precss'),
                require('autoprefixer')
            ];
        }
    }
}, {
    loader: 'sass-loader' // compiles Sass to CSS
}];

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, "src"),
    entry: ['babel-polyfill', './main.tsx'],
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react']
                    }
                }
            },
            {
                test: /\.ts[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react']
                    }
                }, { loader: 'ts-loader' }]
            },
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: cssTransformerSeq
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin("styles.css")
    ]
};
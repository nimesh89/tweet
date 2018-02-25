const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractScss = new ExtractTextPlugin("styles.css");
var extractCss = new ExtractTextPlugin("site.css");

let cssTransformerSeq = [{
    loader: 'css-loader'
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
},  {
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
                use: extractScss.extract({
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: cssTransformerSeq
                })
            },
            {
                test: /\.(css)$/,
                use: extractCss.extract({
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: {
                        loader: 'css-loader'
                    }
                })
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: path.resolve(__dirname, 'wwwroot/fonts/')
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        extractScss,
        extractCss
    ]
};
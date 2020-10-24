const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');
module.exports = {
    entry: {
        index: './src/scripts/index.ts',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: 'ToonBlast',
            template: 'src/html/index.html',
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    externals: {
        'pixi.js': 'PIXI',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css', '.scss', '.json', 'spec.ts'],
        modules: ['node_modules'],
        alias: {
            'styles': path.resolve(__dirname, 'src/html/styles/'),
            'vendor': path.resolve(__dirname, 'src/scripts/lib/js'),
            'app': path.resolve(__dirname, 'src/scripts/game/'),
            'pixi-app-wrapper': path.resolve(__dirname, 'src/scripts/lib/js/dacaher/pixi-app-wrapper'),
            'fpsmeter': path.resolve(__dirname, 'src/scripts/lib/js/darsain/fpsmeter/fpsmeter'),
            'screenfull': path.resolve(__dirname, 'src/scripts/lib/js/sindresorhus/screenfull/screenfull'),
            'eventemitter3': path.resolve(__dirname, 'src/scripts/lib/js/primus/eventemitter3'),
            'gsap': path.resolve(__dirname, 'src/scripts/lib/js/greensock/greensock-js'),
            'pixi-layers': path.resolve(__dirname, 'src/scripts/lib/js/pixijs/pixi-layers/pixi-layers'),
            'pixi-particles': path.resolve(__dirname, 'src/scripts/lib/js/pixijs/pixi-particles/pixi-particles'),
            'pixi-spine': path.resolve(__dirname, 'src/scripts/lib/js/pixijs/pixi-spine/pixi-spine'),
        },
        plugins: [
            new TsConfigPathsPlugin()
        ],
    },
    stats: 'verbose',
};
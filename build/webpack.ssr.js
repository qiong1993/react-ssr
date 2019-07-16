const baseConfig = require("./webpack.base")
const webpackMerge = require("webpack-merge")

const mergedConfig = env => webpackMerge(baseConfig(env),{
    entry:'./server.js',
    target:'node'
})

module.exports = mergedConfig
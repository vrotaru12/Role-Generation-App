const models = require('require-all')({
    dirname: __dirname,
    //excludeDirs: /^(shared)$/i,
    filter: /^([^\.].*)\.js?$/,
    recursive: true,
    resolve: (model) => model
})

// Export our core API models
module.exports = models
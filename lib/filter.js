const match = require('minimatch')
const evaluate = require('./eval')

module.exports = function (files, filters, data, done) {
    if (!filters) {
        return done()
    }
    console.log('有以下文件需要过滤');
    console.log(filters)
    const fileNames = Object.keys(files)
    Object.keys(filters).forEach((glob) => {
        fileNames.forEach(function (file) {
            if (match(file, glob, { dot: true })) {
                const condition = filters[glob]
                if (!evaluate(condition, data)) {
                    delete files[file]
                }
            }
        })
    })
    done()
}
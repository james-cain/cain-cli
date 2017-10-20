let chalk = require('chalk')
let Metalsmith = require('metalsmith')
let Handlebars = require('handlebars')
let async = require('async')
let render = require('consolidate').handlebars.render
let path = require('path')
let multimatch = require('multimatch')
let getOptions = require('./options')
let ask = require('./ask')
let logger = require('./logger')

module.exports = function generate (name, src, dest, done) {
  console.log('dest', dest)
  let opts = getOptions(name, src)
  let metalsmith = Metalsmith(path.join(src, 'template'))
  console.log('src', path.join(src, 'template'))
  let data = metalsmith.metadata()
  opts.helpers && Object.keys(opts.helpers).map(key => {
    Handlebars.registerHelper(key, opts.helper)
  })
  metalsmith.use(askQuestion(opts.prompts))
    .use(renderTemplateFiles(opts.skipInterpolation))
  metalsmith.clean(false)
    .source('.')
    .destination(dest)
    .build(function (err) {
      done(err)
    })
  return data
}

function askQuestion (prompts) {
  return function (files, metalsmith, done) {
    ask(prompts, metalsmith.metadata(), done)
  }
}

function renderTemplateFiles (skipInterpolation) {
  skipInterpolation = typeof skipInterpolation === 'string'
    ? [skipInterpolation]
    : skipInterpolation
  return function (files, metalsmith, done) {
    let keys = Object.keys(files)
    let metalsmithMetadata = metalsmith.metadata()
    async.each(keys, function (file, next) {
      if (skipInterpolation && multimatch([file], skipInterpolation, { dot: true }).length) {
        return next()
      }
      let str = files[file].contents.toString()
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      render(str, metalsmithMetadata, function (err, res) {
        if (err) {
          console.log('异常文件', chalk.red(file))
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        next()
      })
    }, done)
  }
}

let chalk = require('chalk')
let Metalsmith = require('metalsmith')
let Handlebars = require('handlebars')
let async = require('async')
let render = require('consolidate').handlebars.render
let path = require('path')
let getOptions = require('./options')
let ask = require('./ask')
let logger = require('./logger')

module.exports = function generate (name, src, dest, done) {
  let opts = getOptions(name, src)
  let metalsmith = Metalsmith(path.join(src, 'template'))
  let data = metalsmith.metadata()
  opts.helpers && Object.keys(opts.helpers).map(key => {
    Handlebars.registerHelper(key, opts.helper)
  })
  metalsmith.use(ackQuestions(opts.prompts))
    .use(renderTemplateFiles())
  metalsmith.clean(false)
    .source('.')
    .destination(dest)
    .build(function (err, files) {
      done(err)
      // if (typeof opts.complete)
    })
  return data
}

metalsmith.use()

function askQuestion (prompts) {
  return function (files, metalsmith, done) {
    ask(prompts, metalsmith.metadata(), done)
  }
}

function renderTemplateFiles () {
  return function (files, metalsmith, done) {
    let keys = Object.keys(files)
    let metalsmithMetadata = metalsmith.metadata()
    async.each(keys, function (file, next) {
      let str = files[file].contents.toString()
      render(str, metalsmithMetadata, function (err, res) {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        next()
      })
    }, done)
  }
}

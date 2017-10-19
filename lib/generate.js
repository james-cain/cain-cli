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
}

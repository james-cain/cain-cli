let path = require('path')
let metadata = require('read-metadata')
let exists = require('fs').existsSync
let getGitUser = require('./git-user')
let validateName = require('validate-npm-package-name')

module.exports = function options (name, dir) {
  let opts = getMetadata(dir)
  setDefault(opts, 'name', name)
  setValidateName(opts)
  let author = getGitUser()
  if (author) {
    setDefault(opts, 'author', author)
  }
  return opts
}

function getMetadata (dir) {
  let json = path.join(dir, 'meta.json')
  let yml = path.join(dir, 'meta.yml')
  let js = path.join(dir, 'meta.js')
  let opts = {}

  if (exists(json)) {
    opts = metadata.sync(json)
  } else if (exists(yml)) {
    opts = metadata.sync(yml)
  } else if (exists(js)) {
    let req = require(path.resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js 必须是object对象')
    }
    opts = req
  }
  return opts
}

function setDefault (opts, key, val) {
  let prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      'type': 'input',
      'default': val
    }
  } else {
    prompts[key]['default'] = val
  }
}

function setValidateName (opts) {
  let name = opts.prompts.name
  let customValidate = name.validate
  name.validate = name => {
    let its = validateName(name)
    if (!its.validForNewPackages) {
      let errors = (its.errors || []).concat(its.warnings || [])
      return 'Sorry, ' + errors.join(' and ') + '.'
    }
    if (typeof customValidate === 'function') return customValidate(name)
    return true
  }
}

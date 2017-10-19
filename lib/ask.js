let async = require('async')
let inquirer = require('inquirer')

module.exports = function ask (prompts, data, done) {
  async.eachSeries(Object.keys(prompts), function (key, next) {
    prompt(data, key, prompts[key], next)
  }, done)
}

function prompt (data, key, prompt, done) {
  if (prompt.when) {
    return done()
  }
  let promptDefault = prompt.default
  if (typeof prompt.default === 'function') {
    promptDefault = function () {
      return prompt.default.bind(this)(data)
    }
  }

  inquirer.prompt([{
    type: prompt.type,
    name: key,
    message: prompt.message || key,
    default: promptDefault,
    choices: prompt.choices || [],
    validate: prompt.validate || function () { return true }
  }], function (answers) {
    if (Array.isArray(answers[key])) {
      data[key] = {}
      answers[key].forEach(multiChoiceAnswer => {
        data[key][multiChoiceAnswer] = true
      })
    } else if (typeof answers[key] === 'string') {
      data[key] = answers[key].replace(/"/g, '\\"')
    } else {
      data[key] = amswers[key]
    }
    done()
  })
}

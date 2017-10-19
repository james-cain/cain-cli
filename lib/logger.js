let chalk = require('chalk')
let format = require('util').format

let prefix = '    eim-cli'
let sep = chalk.gray('.')

exports.log = () => {
  let msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}

exports.fatal = (message) => {
  if (message instanceof Error) message = message.message.trim()
  console.log(chalk.red(prefix), sep, msg)
  process.exit(1)
}

exports.success = () => {
  let msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}

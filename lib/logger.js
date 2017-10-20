let chalk = require('chalk')
let format = require('util').format

const prefix = '    eim-cli'
const sep = chalk.gray('.')

exports.log = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

exports.fatal = (...args) => {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.log(chalk.red(prefix), sep, msg)
  process.exit(1)
}

exports.success = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

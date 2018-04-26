const chalk = require('chalk')

module.exports = function evaluate (exp, data) {
    var fn = new Function('data', 'with (data) { return ' + exp + '}')
    try {
        return fn(data)
    } catch (e) {
        console.log(chalk.red('Error when evaluating filter condition: ' + exp))
    }
}
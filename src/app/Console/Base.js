const program = require('commander')

/**
 * BaseConsole
 *
 * @setCommand String
 * @setAction String
 * @setAlias String
 * @setDescription Function
 */
export default class Base {
  constructor () {
    this.program     = program
    this.command     = ''
    this.alias       = ''
    this.description = ''
    this.action      = () => {}

    this.setCommand()
    this.setAction()
    this.setAlias()
    this.setDescription()
    this.run()
  }

  setCommand (command = '') {
    this.command = command
  }

  setAlias (alias = '') {
    this.alias = alias
  }

  setDescription (description = '') {
    this.description = description
  }

  run () {
    this.program
        .command(this.command)
        .alias(this.alias)
        .description(this.description)
        .action(this.action);

    this.program.parse(process.argv);
  }

  setAction (func) {
    this.action = func
  }
}
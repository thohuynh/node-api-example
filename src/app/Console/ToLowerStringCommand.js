import Base from './Base'

/**
 * ToLowerStringCommand Test Command
 */
class ToLowerStringCommand extends Base {
  constructor () {
    super()
  }

  setCommand () {
    super.setCommand(`toLower <string>`)
  }

  setAction (string) {
    const self = this

    super.setAction((string) => {
      console.log(self.toLower(string))
    })
  }

  toLower(v) {
    return v.toLowerCase()
  }
}

export default new ToLowerStringCommand()
import AWS from 'aws-sdk'
import config from '../../../config'

export default class AwsBase {
  constructor () {
    this.config = config.s3
    this.region = this.config.region
    this.isLocal = (config.app.environment === 'local')
  }

  getIamRoleConfig () {
    const credentials = new AWS.CredentialProviderChain.defaultProviders

    return {
      credentials: credentials,
      region: this.region,
      version: 'latest'
    }
  }

  getLocalConfig () {
    const credentials = new AWS.Credentials(this.config.key, this.config.secret, this.config.token)

    return {
      credentials: credentials,
      region: this.region,
      version: 'latest'
    }
  }
}
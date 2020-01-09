import AwsBase from './AwsBase'
import config from '../../../config'
import S3 from 'aws-sdk/clients/s3'

class S3Service extends AwsBase{
  constructor () {
    super()

    this.bucket = config.s3.bucket
    this.s3 = {}

    this.initClient()
  }

  initClient () {
    let config = {}

    if (this.isLocal) {
      config = this.getLocalConfig()
    } else {
      config = this.getIamRoleConfig()
    }

    this.s3 = new S3(config)
  }

  listBucketsRemote (callback) {
    return this.s3.listBuckets(callback)
  }
}

export default new S3Service()
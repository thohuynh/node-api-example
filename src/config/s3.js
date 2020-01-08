export default {
  key:        process.env.AWS_S3_KEY,
  secret:     process.env.AWS_S3_SECRET,
  token:      process.env.AWS_S3_TOKEN,
  expiration: process.env.AWS_S3_EXPIRATION,
  region:     process.env.AWS_S3_REGION,
  bucket:     process.env.AWS_S3_BUCKET,
}
import S3Router from 'react-s3-uploader/s3router';

const s3Path = '/s3';
const s3router = S3Router({
  bucket: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION_NAME,
  signatureVersion: 'v4',
  headers: {'Access-Control-Allow-Origin': '*'},
  ACL: 'public-read'
});

export { s3Path, s3router }
import S3 from 'aws-sdk/clients/s3';
import {S3_ACCESS_KEY_ID, S3_BUCKET, S3_SECRET_ACCESS_KEY} from "../config";
import S3Router from 'react-s3-uploader/s3router';

const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: 'home',
  endpoint: 'http://127.0.0.1:9000' ,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
  headers: {'Access-Control-Allow-Origin': '*'},
});

const getS3 = () => s3;

const s3Service = new S3Router({
  bucket: S3_BUCKET,
  ACL: 'public-read',
  getS3,
});

(async () => {
  const log = await s3.listBuckets().promise();
  console.log(log);
})();

export { s3Service };

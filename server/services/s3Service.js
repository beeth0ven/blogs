import S3 from 'aws-sdk/clients/s3';
import {S3_ACCESS_KEY_ID, S3_BUCKET, S3_SECRET_ACCESS_KEY} from "../config";
import S3Router from 'react-s3-uploader/s3router';

const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: 'home',
  endpoint: 'http://home.beeth0ven.cf:9000' ,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
});


const getS3 = () => s3;

const s3Service = new S3Router({
  headers: {'Access-Control-Allow-Origin': '*'},
  bucket: S3_BUCKET,
  ACL: 'public-read',
  getS3,
});


(async () => {

  try {
    const log = await s3.listBuckets().promise();
    console.log(log);
  } catch (error) {
    console.error(error)
  }

})();

export { s3Service };

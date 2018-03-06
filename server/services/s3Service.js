import S3 from 'aws-sdk/clients/s3';
import {S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY} from "../config";

const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  endpoint: 'http://127.0.0.1:9000' ,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4'
});

const testMinio = async () => {
  try {
    const buckets = await s3.listBuckets().promise();
    console.log(buckets);
    const Bucket = buckets.Buckets[0].Name;
    const objects = await s3.listObjects({ Bucket }).promise();
    console.log(objects);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export { testMinio };

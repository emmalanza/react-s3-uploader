import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../aws/s3.js';


export async function deleteImage(key) {
  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
    console.log('Deleted:', key);
  } catch (err) {
    console.error('Delete failed:', err);
    throw err;
  }
}

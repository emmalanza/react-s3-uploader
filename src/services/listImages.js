import s3 from '../aws/s3';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function listImages() {
  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

  const command = new ListObjectsV2Command({
    Bucket: bucketName,
  });

  try {
    const { Contents } = await s3.send(command);
    if (!Contents) return [];
    return Contents.map(obj => obj.Key);
  } catch (err) {
    console.error('Error listando imágenes:', err);
    throw err;
  }
}

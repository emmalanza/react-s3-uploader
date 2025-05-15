import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../aws/s3.js';

export async function uploadImage (file, key) {
  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;
  
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: await file.arrayBuffer(),
    ContentType: file.type,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    return {
      Location: `https://${bucketName}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${key}`,
    };
  } catch (err) {
    console.error('Upload failed:', err);
    throw err;
  }
};


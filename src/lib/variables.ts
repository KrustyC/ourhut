const s3Bucket = import.meta.env.VITE_S3_OUR_HUT_BUCKET;

export const variables = {
  basePath: import.meta.env.VITE_URL,
  s3BucketUrl: `https://${s3Bucket}.s3.amazonaws.com`,
};

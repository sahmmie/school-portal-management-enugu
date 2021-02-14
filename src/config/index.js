import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  databaseURI: process.env.DATABASE_URI,
  secretOrKey: process.env.SECRET_KEY,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api/v1',
  },
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apikey: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
  },

  aws_s3: {
    bucketName: process.env.S3_BUCKET_NAME,
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },

  emailService: {
    service: process.env.HOSTSERVICE,
    host: process.env.HOST,
    email_port: process.env.PORT,
    auth_username: process.env.AUTH_USERNAME,
    auth_password: process.env.AUTH_PASSWORD,
  },
};

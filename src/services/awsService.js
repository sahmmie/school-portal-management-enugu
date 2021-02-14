import aws from 'aws-sdk';
import config from '../config';
import fs from 'fs';
import Functions from '../utils/functions';
const { fileMimeCategory } = Functions;

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: config.aws_s3.accessKeyId,
  secretAccessKey: config.aws_s3.secretAccessKey,
  region: config.aws_s3.region,
});
const s3 = new aws.S3();

const s3_uploads = {
  /**
   *
   * @param {Blob} file
   *  @param {'docs'| 'audios'|'videos'|'photos'} dirName
   */
  file: (file) =>
    new Promise((resolve, reject) => {
      var params = {
        ACL: 'public-read',
        Bucket: config.aws_s3.bucketName,
        Body: fs.createReadStream(file.path),
        Key: `${fileMimeCategory(file)}/${file.originalname}`,
      };
      s3.upload(params, (err, data) => {
        if (data)
          return resolve({
            url: data.Location,
            name: file.originalname,
            mime: fileMimeCategory(file),
            size: file.size,
          });
        if (err) return reject(err);
        fs.unlinkSync(file.path);
      });
    }),
};

export default s3_uploads;

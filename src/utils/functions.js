import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const Functions = {
  generateConfirmCode: () => {
    return Math.floor(100000 + Math.random() * 900000);
  },

  generateReferralCode: (name) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return `fam-${name.toLowerCase()}-${code}`;
  },

  /**
   *
   * @param {[]} array
   */
  removeArrayDuplicates: (array) => {
    try {
      array = array.map((item) => item.toString());
      return _.uniqWith(array, _.isEqual);
    } catch (error) {
      throw error;
    }
  },

  findHashtags: (searchText) => {
    try {
      const regexp = /\B\#\w\w+\b/g;
      let result = searchText.match(regexp);
      if (result) {
        return result;
      } else {
        return [];
      }
    } catch (error) {
      throw Error(error);
    }
  },

  findAtSymbols: (searchText) => {
    try {
      const regexp = /\B\@\w\w+\b/g;
      let result = searchText.match(regexp);
      if (result) {
        return result;
      } else {
        return [];
      }
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   *
   * @param {[String | Number]} array
   * @param {String| Number } lookingFor
   * @param {String | Number} replaceWith
   */
  findAndReplaceArray: (array, lookingFor, replaceWith) => {
    try {
      return array.map((item) => item.replace(lookingFor, replaceWith));
    } catch (error) {
      throw error;
    }
  },

  /**
   * returns the category of file
   * @param {File} file
   */
  fileMimeCategory: (file) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/gif'
    )
      return 'photos';
    if (
      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/mov' ||
      file.mimetype === 'video/wmv' ||
      file.mimetype === 'video/flv' ||
      file.mimetype === 'video/webm' ||
      file.mimetype === 'video/mkv' ||
      file.mimetype === 'video/avi' ||
      file.mimetype === 'video/avchd'
    )
      return 'videos';
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/x-wav')
      return 'audios';

    if (
      file.mimetype === 'text/plain' ||
      file.mimetype === 'text/csv' ||
      file.mimetype === 'application/msword' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/vnd.oasis.opendocument.presentation' ||
      file.mimetype === 'application/vnd.oasis.opendocument.text' ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.rar' ||
      file.mimetype === 'application/vnd.ms-excel' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/zip'
    )
      return 'docs';
  },

  saveFileToSystem: (unProcessedFile) =>
    new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync('files')) fs.mkdirSync('files');
        const new_name = unProcessedFile.originalname;
        const writer = fs.createWriteStream(
          path.resolve(__dirname, '../../files/' + new_name),
          {
            encoding: 'base64',
          }
        );
        writer.write(unProcessedFile.path, (err) => {
          if (err) reject(err);
        });
        writer.end();
        writer.on('finish', () => {
          resolve({
            path: writer.path,
            mimetype: unProcessedFile.mimetype,
            originalname: new_name,
            size: unProcessedFile.size,
          });
        });
      } catch (error) {
        throw error;
      }
    }),
};

export default Functions;

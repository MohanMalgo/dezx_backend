const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const s3 = require("./s3");

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: 'xdminds.com',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    filename: function (req, file, cb) {
      // Keep the original filename for the file
      cb(null, file.originalname);
    },
    key: function (req, file, cb) {
      // Use the original filename as the key
      cb(null, file.originalname);
    },
  }),
});

module.exports = upload;

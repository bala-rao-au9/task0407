const multer = require('multer');

const profilePicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

// Define multer instance for profile picture uploads
const profilePicUpload = multer({ storage: profilePicStorage });

module.exports = {
  profilePicUpload,
};
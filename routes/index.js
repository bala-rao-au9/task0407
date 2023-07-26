const express = require('express');
const { signUp, signIn } = require('../controller/userAuth');
const authenticateToken = require('../middleware/auth');
const { profileGet, profileUpdate } = require('../controller/profile');
const { profilePicUpload } = require('../services/multerConfig');
const router = express.Router();


router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/profile",authenticateToken, profileGet)
router.post("/profile",authenticateToken,profilePicUpload.single('profile_pic'), profileUpdate)


module.exports = router
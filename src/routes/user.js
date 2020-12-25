const express = require('express');
const router = express.Router();


const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

//
const { userSignIn, userSignUp, signout } = require('../controllers/User')

router.post('/signup', upload.single('profilePic'), userSignUp);

router.post('/signin', userSignIn);

router.post('/signout', signout);


module.exports = router;
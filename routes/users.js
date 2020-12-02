// const { Router } = require('express');
var express = require('express');
const passport = require('passport');
var router = express.Router();
const multerConfig = require('../config/multer');
const usersCntrl = require('../controller/users');


router.post('/register', usersCntrl.register);
router.post('/login', usersCntrl.login);
router.get('/', usersCntrl.getUsers)
router.get('/user', passport.authenticate("jwt", {session: false}), usersCntrl.getSingleUser);
router.post('/uploadProfile', usersCntrl.uploadProfilePicture);

module.exports = router;

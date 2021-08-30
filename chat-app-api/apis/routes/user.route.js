const express = require('express');
const multer = require('multer');
const upload = multer();

const router = express.Router();

const controller = require('../controllers/user.controller');

router.post('/', upload.single('avatar'), controller.editProfile);

module.exports = router;

const express = require('express');
const multer = require('multer');
const upload = multer();

const router = express.Router();

const controller = require('../controllers/message.controller');

router.post('/', upload.single('photo'), controller.sendMessage);

module.exports = router;

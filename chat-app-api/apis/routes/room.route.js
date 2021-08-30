const express = require('express');

const router = express.Router();

const controller = require('../controllers/room.controller');

router.get('/', controller.getRooms);
router.get('/:roomId/rooms', controller.arrangeRooms);
router.get('/:roomId', controller.getRoom);
router.get('/:roomId/members', controller.getMembers);
router.post('/create', controller.create);
router.post('/join', controller.join);

module.exports = router;

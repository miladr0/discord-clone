const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const validations = require('./validations');
const roomsController = require('./index');

const router = express.Router();

router.post('/get-or-create', auth(), validate(validations.getOrCreateRoom), roomsController.getOrCreateRoom);
router.get('/open-rooms', auth(), roomsController.getOpenRooms);
router.put('/close-room/:roomId', auth(), validate(validations.closeRoom), roomsController.closeRoom);

module.exports = router;

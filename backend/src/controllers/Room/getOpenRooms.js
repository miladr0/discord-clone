const httpStatus = require('http-status');

const roomService = require('../../services/room.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const rooms = await roomService.getOpenRooms(req.user);
  res.status(httpStatus.CREATED).send(rooms);
});

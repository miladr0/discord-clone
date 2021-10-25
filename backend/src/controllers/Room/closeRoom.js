const httpStatus = require('http-status');

const roomService = require('../../services/room.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const { user } = req;
  const { roomId } = req.params;

  const rooms = await roomService.closeRoom(user, roomId);
  res.status(httpStatus.OK).send(rooms);
});

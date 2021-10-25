const httpStatus = require('http-status');

const friendService = require('../../services/friend.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const pendingList = await friendService.getAllFriends(req.user);
  res.status(httpStatus.OK).send(pendingList);
});

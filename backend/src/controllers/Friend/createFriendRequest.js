const httpStatus = require('http-status');

const friendService = require('../../services/friend.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const user = await friendService.createFriendRequest(req.user, req.body);
  res.status(httpStatus.CREATED).send(user);
});

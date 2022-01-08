const httpStatus = require('http-status');

const messageService = require('../../services/message.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const { messageId } = req.params;

  const deleted = await messageService.deleteMessage(req.user, messageId);
  res.status(httpStatus.OK).send(deleted);
});

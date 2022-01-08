const httpStatus = require('http-status');

const messageService = require('../../services/message.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const { message } = req.body;
  const { messageId } = req.params;

  const result = await messageService.editMessage(req.user, { message, messageId });
  res.status(httpStatus.CREATED).send(result);
});

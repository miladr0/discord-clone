const httpStatus = require('http-status');

const messageService = require('../../services/message.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const formData = JSON.parse(JSON.stringify(req.body));
  const message = await messageService.createMessage(req.user, formData);
  res.status(httpStatus.CREATED).send(message);
});

const httpStatus = require('http-status');

const messageService = require('../../services/message.service');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { page } = req.query;
  const filter = {
    roomId,
  };
  const options = {
    sortBy: '_id:desc',
    page,
    populate: 'senderId',
  };
  const messages = await messageService.queryMessages(filter, options, req.user);
  console.log('message: ', messages);
  res.status(httpStatus.CREATED).send(messages);
});

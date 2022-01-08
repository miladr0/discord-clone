const Joi = require('joi');
const { objectId } = require('../../../validations/custom.validation');

const createMessage = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    roomId: Joi.string().custom(objectId),
  }),
};

const editMessage = {
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
  params: Joi.object().keys({
    messageId: Joi.string().required(),
  }),
};

module.exports = {
  createMessage,
  editMessage,
};

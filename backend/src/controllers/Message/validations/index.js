const Joi = require('joi');
const { objectId } = require('../../../validations/custom.validation');

const createMessage = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    roomId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMessage,
};

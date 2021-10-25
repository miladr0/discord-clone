const Joi = require('joi');

const createFriendRequest = {
  body: Joi.object().keys({
    username: Joi.string().min(4).required(),
    shortId: Joi.string().min(4).max(4).required(),
  }),
};

module.exports = {
  createFriendRequest,
};

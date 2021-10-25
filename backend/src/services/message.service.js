const httpStatus = require('http-status');
const { FriendRequest, Room, Message } = require('../models');
const { FRIEND_STATUS } = require('../config/constants/modelsConstants');
const ApiError = require('../utils/ApiError');

function friendId(user, object) {
  if (user._id.toString() === object.sender.toString()) return object.receiver;

  return object.sender;
}

/**
 * Create a message between a user and a friend
 * @param {Object} user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createMessage = async (user, body) => {
  const { roomId, text } = body;

  const room = await Room.findOne({
    $or: [{ sender: user._id }, { receiver: user._id }],

    _id: roomId,
  });

  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no room between you and your friend!`);
  }

  const friendShip = await FriendRequest.findOne({
    $or: [
      { from: user._id, to: friendId(user, room) },
      { to: user._id, from: friendId(user, room) },
    ],
    status: FRIEND_STATUS.FRIEND,
  });

  if (!friendShip) {
    throw new ApiError(httpStatus.NOT_FOUND, `you and your friend do not have friendship!`);
  }

  const message = await Message.create({
    senderId: user._id,
    roomId,
    message: text,
  });

  return message;
};

/**
 * Query for Message
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMessages = async (filter, options, user) => {
  const filterClone = { ...filter };
  const room = await Room.findOne({
    $or: [{ sender: user._id }, { receiver: user._id }],

    _id: filter.roomId,
  });

  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no room between you and your friend!`);
  }

  if (user._id.toString() === room.sender.toString()) {
    filterClone.messageDeletedBySender = false;
  } else {
    filterClone.messageDeletedByReceiver = false;
  }

  const messages = await Message.paginate(filterClone, options);
  return messages;
};

module.exports = {
  createMessage,
  queryMessages,
};

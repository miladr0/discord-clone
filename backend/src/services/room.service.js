const httpStatus = require('http-status');
const { FriendRequest, Room } = require('../models');
const { FRIEND_STATUS } = require('../config/constants/modelsConstants');
const ApiError = require('../utils/ApiError');

/**
 * Create a direct room between a user and a friend
 * @param {Object} user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const getOrCreateRoom = async (user, body) => {
  console.log('user: ', user);
  const { id } = body;
  console.log('id: ', id);

  const friendShip = await FriendRequest.findOne({
    $or: [
      { from: user._id, to: id },
      { from: id, to: user._id },
    ],
    status: FRIEND_STATUS.FRIEND,
  });
  console.log('friendShip: ', friendShip);
  if (!friendShip) {
    throw new ApiError(httpStatus.NOT_FOUND, `you and your friend do not have friendship!`);
  }

  if (friendShip._id.toString() === user._id.toString()) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, `You cannot send dm to yourself!`);
  }

  const alreadyRoom = await Room.findOne({
    $or: [{ sender: user._id }, { receiver: user._id }],
  });
  console.log('alreadyRoom: ', alreadyRoom);

  if (alreadyRoom) {
    if (alreadyRoom.sender.toString() === user._id.toString()) {
      alreadyRoom.roomDeletedBySender = false;
      console.log('roomDeletedBySender: ');
      alreadyRoom.save();
    } else {
      alreadyRoom.roomDeletedByReceiver = false;
      console.log('roomDeletedByReceiver: ');
      alreadyRoom.save();
    }

    return alreadyRoom;
  }

  const createdRoom = await Room.create({ sender: user._id, receiver: id });

  return createdRoom;
};

/**
 * all open rooms between a user and friends
 * @param {Object} user
 * @returns {Promise<User>}
 */
const getOpenRooms = async (user) => {
  const rooms = await Room.find({
    $or: [
      ({ sender: user._id, roomDeletedBySender: false },
      {
        receiver: user._id,
        roomDeletedByReceiver: false,
      }),
    ],
  })
    .populate({ path: 'sender' })
    .populate({ path: 'receiver' });

  return rooms;
};

/**
 * close a room by sender or receiver
 * @param {Object} user
 * @param {string} roomId
 * @returns {Promise<User>}
 */
const closeRoom = async (user, roomId) => {
  const room = await Room.findById(roomId);
  console.log('room: ', user._id.toString() === room.sender.toString());

  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, `room not existed!`);
  }

  if (user._id.toString() !== room.sender.toString() && user._id.toString() !== room.receiver.toString()) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, `you are not allowed to do this!`);
  }

  if (user._id.toString() === room.sender.toString()) {
    room.roomDeletedBySender = true;
  } else if (user._id.toString() === room.receiver.toString()) {
    room.roomDeletedByReceiver = true;
  }

  await room.save();

  return room;
};

module.exports = {
  getOrCreateRoom,
  getOpenRooms,
  closeRoom,
};

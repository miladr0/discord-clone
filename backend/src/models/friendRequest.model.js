const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { FRIEND_STATUS } = require('../config/constants/modelsConstants');

const friendRequestSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FRIEND_STATUS),
      default: FRIEND_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
friendRequestSchema.plugin(toJSON);
friendRequestSchema.plugin(paginate);

/**
 * @typedef FriendRequest
 */
const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

module.exports = FriendRequest;

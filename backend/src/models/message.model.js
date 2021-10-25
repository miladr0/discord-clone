const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    roomId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Room',
      required: true,
    },
    message: {
      type: String,
    },
    messageDeletedBySender: {
      type: Boolean,
      default: false,
    },
    messageDeletedByReceiver: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

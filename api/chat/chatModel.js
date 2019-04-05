'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
  chatType: { type: String, required: true, enum: ['private', 'group'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  acceptedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [
    {
      _id: false,
      sentAt: { type: Number },
      sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      receivedBy: [
        {
          userId: mongoose.Schema.Types.ObjectId, ref: 'User',
          _id: false,
          receivedAt: { type: Number },
        }
      ],
      message: { type: String }
    }
  ]
}, {
    versionKey: false,
    timestamps: true
  });


module.exports = mongoose.model('Chat', ChatSchema);


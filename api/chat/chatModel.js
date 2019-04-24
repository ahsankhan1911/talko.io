'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
  chatType: { type: String, required: true, enum: ['private', 'group'] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  acceptedBy: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [
    {
      _id: false,
      type: Object,
      sentAt: { type: Number },
      sentBy: { type: Schema.Types.ObjectId, ref: 'User' },
      // receivedBy: [
      //   {
      //     type: Object,
      //     userId: Schema.Types.ObjectId, ref: 'User',
      //     _id: false,
      //     receivedAt: { type: Number },
      //   }
      // ],
      messageType: {type: String, enum:['text', 'image', 'audio', 'video']},
      message: { type: String }
    }
  ]
}, 
{
    versionKey: false,
    timestamps: true
}
);


module.exports = mongoose.model('Chat', ChatSchema);


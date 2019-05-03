'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
  chatType: { type: String, required: true, enum: ['private', 'group'] },
  isActive: {type: Boolean, default: true},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  acceptedBy: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: 
    {
      _id: false,
      type: Array,
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
      isViewed: {type: Boolean, default: false},
      chatMessage: { type: String }
    },
  groupName: {type: String, required: function () {this.chatType === 'group'} },
  groupImage: {type: String, required: function () {this.chatType === 'group'} }

  
}, 
{
    versionKey: false,
    timestamps: true
}
);


module.exports = mongoose.model('Chat', ChatSchema);


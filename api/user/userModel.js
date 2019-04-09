'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email : {type : String, required: true, unique: true},
  phone: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  profilePicture: { type: String ,default:  '/images/default_user.jpeg'},
  contacts : [{
    _id: false,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    addedAt: {type :Number}
  }
  ], 
  contactRequests: [{
    _id: false,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    requestedAt: {type: Number},
    requestMessage: {type: String, default: "Hey ! Would you like to chat with me on Talko "},
    isAccepted: {type: Boolean, default: false}
  }],
  age: { type: Number },
  isActive: {type: Boolean, default: true},
  isVerified: {type: Boolean, default: false},
  accountVerificationCode: {type: Number, default: null},
  blockedUsers: [{
    _id:false,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    blockedAt: {type: Number}
  }
  ],
},{
  versionKey:false,
  timestamps:true
});


module.exports = mongoose.model('User', UserSchema);


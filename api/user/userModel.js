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
  contacts : [{type : mongoose.Schema.Types.ObjectId, ref: 'User', default: []}], 
  age: { type: Number },
  isActive: {type: Boolean, default: true},
  isVerified: {type: Boolean, default: false},
  accountVerificationCode: {type: Number, default: null},
  blockedUsers: [{type:mongoose.Schema.Types.ObjectId, ref: 'User',  default: []}],
  accessToken : {type:  Array, default: []}
},{
  versionKey:false,
  timestamps:true
});


module.exports = mongoose.model('User', UserSchema);


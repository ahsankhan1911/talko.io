var express = require('express');
const controller = require('./chatController');
const chatMiddleware = require('./chatMiddleware') 
var multer = require('multer');

const chatRouter = express.Router();


// chatRouter.route('/signup')
// chatRouter.route('/login').post(controller.chatLogin)
// chatRouter.route('/details/:_id').get([chatMiddleware.authenticatechatAccesstoken], controller.chatDetails)
// chatRouter.route('/edit-profile/:_id').post([chatMiddleware.authenticatechatAccesstoken, chatMiddleware.uploadchatProfilePicture,chatMiddleware.validateProfileEdit], controller.chatEditProfile)
// chatRouter.route('/verify-code').post(controller.verifyCode)

module.exports = chatRouter
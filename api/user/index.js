var express = require('express');
const controller = require('./userController');
const userMiddleware = require('./userMiddleware') 
var multer = require('multer');

const userRouter = express.Router();


userRouter.route('/signup').post( [userMiddleware.validateSignUp], controller.userSignup)
userRouter.route('/login').post(controller.userLogin)
userRouter.route('/details/:_id').get([userMiddleware.authenticateUserAccesstoken], controller.userDetails)
userRouter.route('/edit-profile/:_id').post([userMiddleware.authenticateUserAccesstoken, userMiddleware.uploadUserProfilePicture,userMiddleware.validateProfileEdit], controller.userEditProfile)
userRouter.route('/verify-code').post(controller.verifyCode)

module.exports = userRouter
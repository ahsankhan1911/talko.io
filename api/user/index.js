var express = require('express');
const controller = require('./userController');
const userMiddleware = require('./userMiddleware') 

const userRouter = express.Router();


userRouter.route('/signup').post( [userMiddleware.validateSignUp], controller.userSignup)
userRouter.route('/login').post(controller.userLogin)
userRouter.route('/details').get([userMiddleware.authenticateUserAccesstoken], controller.userDetails)
userRouter.route('/details/:email').get([userMiddleware.authenticateUserAccesstoken], controller.userDetailsEmail)
userRouter.route('/edit-profile').post([userMiddleware.authenticateUserAccesstoken, userMiddleware.uploadUserProfilePicture,userMiddleware.validateProfileEdit], controller.userEditProfile)
userRouter.route('/verify-code').post(controller.verifyCode)
userRouter.route('/send-contact-request').post([userMiddleware.authenticateUserAccesstoken], controller.sendContactReq)
userRouter.route('/cancel-contact-request').post([userMiddleware.authenticateUserAccesstoken], controller.cancelContactReq)
userRouter.route('/accept-contact-request').post([userMiddleware.authenticateUserAccesstoken], controller.acceptContactReq)
userRouter.route('/delete-contact-request').post([userMiddleware.authenticateUserAccesstoken], controller.deleteContactReq)
userRouter.route('/get-contact-request').get([userMiddleware.authenticateUserAccesstoken], controller.getContactReq)
userRouter.route('/search').get([userMiddleware.authenticateUserAccesstoken], controller.searchUsers)


module.exports = userRouter
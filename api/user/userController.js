const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const userDoa = require('./userDao');
var ua = require('universal-analytics');
 //Google Analytics
 var visitor = ua('UA-125945051-2');



exports.userSignup = (request, response) => {
    let { name, email, password, gender } = request.body

    userDoa.createUser({ name, email, password, gender }).then((result) => {
        responseHandler.sendSuccess(response, {
            responceMessage: "You have successfully created an account. Please check your email for verification.",
            userId: result._id,
            isVerified: result.isVerified,
            email: result.email
        })
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}



exports.userLogin = (request, response) => {
    visitor.pageview("/api/user/login", function (err, data) {
        if(err) {
          throw new Error(err)
        }
        else {
          console.log(data)
          console.log("Request send to google")
        }
      }); 
    let {email, password} = request.body
    userDoa.userLogin({email, password}).then((result) => {
        responseHandler.sendSuccess(response, result)

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
       
  }   

exports.userDetails = (request, response) => {
    let { _id } = request.params
    userDoa.userDetails({ _id }).then((result) => {
        responseHandler.sendSuccess(response, result)
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })

} 

exports.userEditProfile = (request, response) => {
    let {name, age, phone} = request.body
    let {_id }= request.params 
    let  file = request.file

    if(file)
     var profilePicture = `/images/users/${file.filename}` 

    userDoa.userEditProfile({_id, name,profilePicture,age,phone}).then((result) => {
        responseHandler.sendSuccess(response, {responceMessage: "user updated successfully !", user : result})
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
    
} 

exports.verifyCode = (request, response) => {
    let {email, verificationCode} = request.body;
    verificationCode = Number(verificationCode)
    console.log(verificationCode)

       userDoa.verifyCode({email, verificationCode}).then((result) => {
             responseHandler.sendSuccess(response, {responceMessage: "You have successfully verified your account", accessToken: result.accessToken, userId: result.user._id, email: result.user.email})
       }).catch((error) => {    
        responseHandler.sendError(response, error)
    })
}

exports.sendContactReq =  (request, response) => {
    let {senderId, receiverId} = request.body;

       userDoa.sendContactReq({senderId, receiverId}).then((result) => {
             responseHandler.sendSuccess(response, {responceMessage: "Request send successfully !", receiver: result})
       }).catch((error) => {    
        responseHandler.sendError(response, error)
    })
}
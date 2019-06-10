const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const userDoa = require('./userDao');
// var ua = require('universal-analytics');
 //Google Analytics
//  var visitor = ua('UA-125945051-2');



exports.userSignup = (request, response) => {
    let { name, email, password, gender } = request.body

    userDoa.createUser({ name, email, password, gender }).then((result) => {
        responseHandler.sendSuccess(response, {
            message: "You have successfully created an account. Please check your email for verification.",
            userId: result._id,
            isVerified: result.isVerified,
            email: result.email
        })
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}



exports.userLogin = (request, response) => {
    // visitor.pageview("/api/user/login", function (err, data) {
    //     if(err) {
    //       throw new Error(err)
    //     }
    //     else {
    //       console.log("Request send to google")
    //     }
    //   }); 
    let {email, password} = request.body
    userDoa.userLogin({email, password}).then((result) => {
        responseHandler.sendSuccess(response, result)

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })
       
  }   

exports.userDetails = (request, response) => {
    let { _id } = request.user
    userDoa.userDetails({ _id }).then((result) => {
        responseHandler.sendSuccess(response, result, "Record found successfully")
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })

} 

exports.userDetailsEmail = (request, response) => {

    let {email} = request.params

    userDoa.userDetailsEmail({email}).then((result) => {
        responseHandler.sendSuccess(response, result,"Record found successfully")
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.userEditProfile = (request, response) => {
    let {name, age, phone} = request.body
    let {_id }= request.user 
    let  file = request.file

    if(file)
     var profilePicture = `/images/users/${file.filename}` 

    userDoa.userEditProfile({_id, name,profilePicture,age,phone}).then((result) => {
        responseHandler.sendSuccess(response, {user : result}, "user updated successfully !")
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
    
} 

exports.verifyCode = (request, response) => {
    let {email, verificationCode} = request.body;
    verificationCode = Number(verificationCode)

       userDoa.verifyCode({email, verificationCode}).then((result) => {
             responseHandler.sendSuccess(response, {message: "You have successfully verified your account", accessToken: result.accessToken, userId: result.user._id, email: result.user.email})
       }).catch((error) => {    
        responseHandler.sendError(response, error)
    })
}

exports.sendContactReq =  (request, response) => {
    // console.log(request.user)
    // let user = JSON.parse(request.user)
    let senderId = request.user._id
    let {receiverId,requestMessage} = request.body;

       userDoa.sendContactReq({senderId, receiverId,requestMessage}).then((result) => {
             responseHandler.sendSuccess(response, {message: `Request send successfully to ${result.name} !`, receiver: result})
       }).catch((error) => {    
        responseHandler.sendError(response, error)
    })
}

exports.cancelContactReq = (request, response) => {
    let senderId = request.user._id

    let {receiverId} = request.body;

    userDoa.cancelContactReq({senderId, receiverId}).then((result) => {
          responseHandler.sendSuccess(response, {message: "Request cancelled successfully !", receiver: result})
    }).catch((error) => {    
     responseHandler.sendError(response, error)
 })

}

exports.acceptContactReq = (request, response) => {
  
    let receiverId = request.user._id
    let {senderId} = request.body;

    userDoa.acceptContactReq({senderId, receiverId}).then((result) => {
          responseHandler.sendSuccess(response, {message:`${result.name} is now in your contact list`, acceptedUser: result})
    }).catch((error) => {    
     responseHandler.sendError(response, error)
 })

}

exports.deleteContactReq = (request, response) => {
    let receiverId = request.user._id

    let {senderId}= request.body
    userDoa.deleteContactReq({senderId, receiverId}).then((result) => {
        responseHandler.sendSuccess(response, {message: "Request deleted successfully !"})
  }).catch((error) => {    
   responseHandler.sendError(response, error)
})

}

exports.searchUsers = (request, response) => {
     let {key} = request.query
     let _id = request.user._id

     userDoa.searchUsers({key, _id}).then((result) => {
          responseHandler.sendSuccess(response, result)
     })
}

exports.getContactReq = (request, response) => {
    let _id = request.user._id

    userDoa.getContactReq({_id}).then((result) => {
         responseHandler.sendSuccess(response, result)
    })
    .catch((error) => {
        responseHandler.sendError(response, error)
    })
}


const User = require('./userModel'),
    Exception = require('../../lib/model/Exception'),
    jwtHandler = require('../../lib/jwt');
const emailHandler = require('../../lib/email');
const appUtils = require('../../lib/appUtils')
const chatDao = require('../chat/chatDoa')
const bcryptHandler = require('../../lib/bcrypt')


var checkIfEmailExist = (userData) => {
    let regex = new RegExp(userData.email.replace(userData.email, `^${userData.email}$`), 'i')
    let query = { email: { '$regex': regex } }
    return User.findOne(query).then((result) => {
        if (result) { return true; }
        else { return false; }
    }).catch((error) => {
        throw error
    })
}

var userLogin = (userData) => {
    //Email Auth
    let regex = new RegExp(userData.email.replace(userData.email, `^${userData.email}$`), 'i')
    return User.findOne({ email: { '$regex': regex } }).then((user) => {
        if (user) {

            //Password Auth
            let password  = bcryptHandler.comparePassword(userData.password, user.password)
            if(password) {

                if (user.isActive === false) {
                    throw new Exception(3, "You have been blocked by Admin", null , 403)
                }

                if (user.isVerified === true) {
                    let payload = {
                        _id: user._id,
                        email: user.email,
                    }

                    return jwtHandler.generateAccessToken(payload).then((result) => {
                        return { message: "Login successfully !", userId: user._id, accessToken: result, isVerified: user.isVerified, name: user.name, email: user.email }
                    })


                }

                return { message: "You have not verified your account yet.", userId: user._id, isVerified: false, email: user.email }

            }

            else {
                throw new Exception(2, "Password does not match",null, 401);
            }
        }
        else {
            throw new Exception(1, "No user found on this email");
        }

    }).catch((error) => {
        throw error;
    })
}





var createUser = (userData) => {
    return checkIfEmailExist(userData).then( async (result) => {
        if (result) {
            throw new Exception(1, "User already exist with this email");
        }
        userData.password = await bcryptHandler.encryptPassword(userData.password)
        let verifcationCode = appUtils.getRandomOtp(4)
        userData.accountVerificationCode = verifcationCode
        return User.create(userData).then((user) => {
            return emailHandler.sendVerificationEmail(user.email, "verification@talko.io", verifcationCode).then((info) => {
                console.log("Message sent to ", info.accepted[0])
                return user
            })
        })
    })

}

var userEditProfile = (userData) => {
    let set = {}
    let update = { '$set': set }
    let options = { select: { _id: 0, name: 1, email: 1, age: 1, gender: 1, profilePicture: 1, phone: 1 }, new: true }

    if (userData.profilePicture)
        set.profilePicture = userData.profilePicture

    if (userData.name)
        set.name = userData.name

    if (userData.age)
        set.age = userData.age

    if (userData.phone)
        set.phone = userData.phone

    return User.findByIdAndUpdate(userData._id, update, options)

}

var userDetails = (userData) => {
    return User.findById(userData._id, { _id: 1, name: 1, email: 1, age: 1, gender: 1, profilePicture: 1, phone: 1 })
}

var userDetailsEmail = (userData) => {
    return User.findOne({email: userData.email},{  _id: 0, name: 1, email: 1,profilePicture: 1, gender:1, age:1})
}

var authenticateUserAccesstoken = (userData) => {
    let query = { accessToken: userData.accessToken }
    return User.findOne(query)
}


var verifyCode = (userData) => {
    let query = { email: userData.email, accountVerificationCode: userData.verificationCode }
    return User.findOne(query).then((user) => {
        if (user) {
            let payload = {
                _id: user._id,
                email: user.email,
                name: user.name
            }
            return jwtHandler.generateAccessToken(payload).then((result) => {
                let update = { "$set": { isVerified: true }, "$unset": { accountVerificationCode: '' } }
                return User.findOneAndUpdate(query, update).then((verifiedUser) => {

                    return { user: verifiedUser, accessToken: result }
                })

            })

        }
        else {
            throw new Exception(1, "No user found on this code")
        }
    })
}

var checkIfContactReqExist = (senderId) => {
    let query = { 'contactRequests.sender': senderId }
    return User.findOne(query)
}

var sendContactReq = (userData) => {
    let condition = { _id: userData.receiverId }
    var contactData = {
        sender: appUtils._convertToObjectIds(userData.senderId),
        requestedAt: Date.now(),
        requestMessage: userData.requestMessage

    }
    let update = { '$push': { 'contactRequests': contactData } }
    return checkIfContactReqExist(userData.senderId).then((result) => {
        if (result)
            throw new Exception(1, "You have already send a request to this user")
        else
            return User.findOneAndUpdate(condition, update, { new: true, fields: { _id: 1, name: 1, email: 1, contactRequests: 1 } })
    })

}

var cancelContactReq = (userData) => {
    let query = { _id: appUtils._convertToObjectIds(userData.receiverId) }
    let update = { '$pull': { contactRequests: { sender: userData.senderId } } }

    return User.findOneAndUpdate(query, update, { new: true, fields: { _id: 1, name: 1, email: 1, contactRequests: 1 } })
}

var acceptContactReq = (userData) => {
    let query = { _id: appUtils._convertToObjectIds(userData.receiverId), 'contactRequests.sender': appUtils._convertToObjectIds(userData.senderId) }

    let senderData = {
        userId: userData.senderId,
        addedAt: Date.now()
    }
    let update = { '$push': { contacts: senderData}, '$set': {'contactRequests.$.isAccepted': true} }

    return User.findOneAndUpdate(query, update, { new: true }).then((result) => {
        let query = { _id: appUtils._convertToObjectIds(userData.senderId) }

        let receiverData = {
            userId: userData.receiverId,
            addedAt: Date.now()
        }
        let update = { '$push': { contacts: receiverData } }

        return User.findOneAndUpdate(query, update, { fields: { _id: 1, name: 1, email: 1 } }).then((result) => {

            //Creating new chat collection
             let chatData = {
                chatType: 'private',
                createdBy:userData.senderId,
                acceptedBy:userData.receiverId
             }
             chatDao.createChat(chatData)
             return result
               
        })
    })
}

var deleteContactReq = (userData) => {
    let query = { _id: appUtils._convertToObjectIds(userData.receiverId) }
    let update = { '$pull': { contactRequests: { sender: userData.senderId } } }
    return User.findOneAndUpdate(query, update)
}


var searchUsers = (userData) => {
    let aggPipe = []
    let match = {};
    match = userData.key ? { '$or': [{ name: { '$regex': userData.key, '$options': '-i' } }, { email: { '$regex': userData.key, '$options': '-i' } }] } : {};

    aggPipe.push({ '$match': match })


    //filtering the logged in user
    let match2 = {
        _id: { '$ne': appUtils._convertToObjectIds(userData._id) }
    }

    aggPipe.push({ '$match': match2 })

    let project = { _id: 0, name: 1, email: 1, profilePicture: 1 }

    aggPipe.push({ '$project': project })

    return User.aggregate(aggPipe)
}

var getContactReq = (userData) => {
    let aggPipe = [ ]

    let match = { _id : appUtils._convertToObjectIds( userData._id)}
    aggPipe.push({'$match': match})
    let eq = ['$$contactRequests.isAccepted', false];
    let filter = { input: '$contactRequests', as: 'contactRequests', cond: { '$eq': eq } };
    let project = {
        contactRequests: {'$filter': filter }, _id:0
    }
    aggPipe.push({'$project': project})

    return  User.aggregate(aggPipe).then((result) => {
            let select= {_id:1, name:1, email:1, profilePicture:1}
          return User.populate(result[0].contactRequests, {path: 'sender', select: select})
    })
}   


var verifyUserPayloadId  = (userData) => {

    return User.findById(userData._id)
}

module.exports = {
    checkIfEmailExist,
    createUser,
    userLogin,
    userEditProfile,
    userDetails,
    authenticateUserAccesstoken,
    verifyCode,
    sendContactReq,
    cancelContactReq,
    acceptContactReq,
    deleteContactReq,
    searchUsers,
    getContactReq,
    verifyUserPayloadId,
    userDetailsEmail
}
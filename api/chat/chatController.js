const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const chatDoa = require('./chatDoa');

exports.createChat = (request, response) => {
    let _id = request.user._id
          chatDoa.createChat({_id})
}

exports.getChats = (request, response) => {
    let userId = request.user._id

    chatDoa.getChats({userId}).then((result) => {
        let chatData = []
       result.forEach((element) => {
           let obj = {
            _id: element._id,
            createdBy:element.createdBy,
            acceptedBy: element.acceptedBy,
            user: userId,
            chatType: element.chatType,
            messages: element.messages

           }
        //    console.log("ELEMENT >> ",element)
           chatData.push(obj)
       })
// console.log("CHAT DATA >> ", chatData)
        responseHandler.sendSuccess(response, chatData, "Chats records found successfully !")
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })
}
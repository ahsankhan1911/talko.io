const Chat = require('./chatModel')
const chatService = require('./chatService');
const appUtils = require('../../lib/appUtils')


var createChat = (chatData) => {

 return Chat.create(chatData).then((result) => {

     chatService.createSocketNameSpace(result._id)

     return null;
 })
}

function chatMessage (chatData)  {   
    let query = {_id: chatData.chatId}
    let messageData = {
        sentAt: chatData.sentAt,
        sentBy: chatData.sentBy,
        chatMessage: chatData.chatMessage,
        messageType: chatData.messageType,
        isViewed: false

    }
    let update = {'$push': {'messages': messageData}}
   return Chat.findOneAndUpdate(query, update).exec()
}

var getChats = (chatData) => {
//    let aggPipe = []

    // let match = {'createdBy': chatData.userId}

    // aggPipe.push({'$match': match})

    // let match2 ={'acceptedBy': chatData.userId} 

    // aggPipe.push({'$match': match2})
    // let project = {_id:1}

    // aggPipe.push({'$project': project})

    // return Chat.aggregate(aggPipe)

    let condition = {'$or': [  {acceptedBy: chatData.userId },  {createdBy: chatData.userId}]}

    return Chat.find(condition).then((result) => {
        // result.forEach((element) => {
        //     chatService.createSocketNameSpace(element._id)
            

        // })
        // chatService.createSocketNameSpace(result[0]._id)
        console.log("CHATS RESULTS",result)
        return Chat.populate(result, {path: 'createdBy acceptedBy', select: {_id:1, name:1, profilePicture:1}})
        
    })
}


module.exports = {
    createChat,
    chatMessage,
    getChats
    
}
const Chat = require('./chatModel')
const chatService = require('./chatService')


var createChat = (chatData) => {

 return Chat.create(chatData).then((result) => {

     chatService.createSocketNameSpace(result._id)

     return null;
 })
}

var chatMessage = (chatData) => {
    let query = {_id: chatData.chatId}
    let messageData = {
        sentAt: chatData.sentAt,
        sentBy: chatData.sentBy,
        receivedBy: [chatData.receivedBy],
        message: chatData.message

    }
    let update = {'$push': {messages: messageData}}
     Chat.findOneAndUpdate(query, update).exec()
}


module.exports = {
    createChat,
    chatMessage
}
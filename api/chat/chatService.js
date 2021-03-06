const {io} = require('../../lib/socketIO')
// const chatDao =  require('./chatDoa')


var createSocketNameSpace = (chatId) => {
     let namespace =  io.of(`/${chatId}`)
     namespace.on('connection', (socket) => {
        console.log("name space created by", chatId)
      //   console.log("Socket  >>> ", socket)

      socket.addListener('chatMessage', (data) => {

         console.log('MESAGE CAME >> ', data)
               //  namespace.emit('chatMessage', data)
               const chatDao =  require('./chatDoa')

               chatDao.chatMessage(data)
               namespace.emit('chatMessage', data)
      })

     })

    
}

module.exports = {
   createSocketNameSpace
}
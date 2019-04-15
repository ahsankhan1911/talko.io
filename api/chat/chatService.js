const {io} = require('../../lib/socketIO')

var createSocketNameSpace = (chatId) => {
     return io.of(`/${chatId}`)
}

module.exports = {
   createSocketNameSpace
}
const server = require('http').createServer();

//Server Configuration
const io = require('socket.io')( {
  serveClient: true,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 6000000,
  cookie: false
});

const io = require('socket.io')({

})





module.exports= {server,io}
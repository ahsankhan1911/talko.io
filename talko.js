'use strict';
var path = require('path');
// Load .env file
require('dotenv').load({
  path: path.join(__dirname, './.env'),
  silent: true
});


var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
// const ViModel = require('./api/model');
var PORT = process.env.PORT || 5000
const { io, server } = require('./lib/socketIO/index')

const chatDao = require('./api/chat/chatDoa')
const Chat = require('./api/chat/chatModel')
const userDao = require('./api/user/userDao')

// const Content = mongoose.model('Content');
console.log("Talko app starting on", process.env.NODE_ENV, 'environment')
console.log()

/**
 * MongoDB Config
 */
mongoose.Promise = require('bluebird')
mongoose.set('debug', true);

mongoose.connect("mongodb://localhost:27017/talkoDB", { useMongoClient: true }).then((result) => {

  console.log("Connected To MongoDB on :", {
    Database: result.name,
    Port: result.port,
    Host: result.host
  })
  return;
}).catch((error) => {
  throw new Error(error.message)
})
/**
 * MongoDB Config End
 */






/**
 * Socket.io 
 */
server.listen(8000, (socket) => {
  console.log("Socket server running on 8000")

})

io.on('connection', (socket) => {

  console.log("Client connected with id: ", socket.id)

  io.to(socket.id).emit('idUpdated', {socketId: socket.id})

  socket.on('contactReqSend', (data) => {
    console.log("CAME HERE  adasdasd >>> ", data)
      io.to(data.socketId).emit('contactReq', data)
      
    })
  
})

io.on('contactReqSend' , (data) => {
console.log("CAME HERE >>> ", data)
  io.to(data.socketId).emit('contactReq', data)
  
})


// var namespace2 = io.of('/5cb5da4cf59162d209ecbcea')

// namespace2.on('connection', (socket) => {   
//   console.log("CONNECTED", socket.id)

//   socket.on('chatMessage', (data) => {
//     console.log("Message came >> ", data)

//     chatDao.chatMessage(data)
//     namespace2.emit('chatMessage', data)
//   })


// })


Chat.find({ isActive: true }).then((result) => {
  console.log("came here >> ", result)
  result.forEach((element) => {
    var namespace = io.of(`/${element._id}`)

    namespace.on('connection', (socket) => {
      console.log("CONNECTED", socket.id)

      socket.on('chatMessage', (data) => {
        console.log("Message came >> ", data)

        chatDao.chatMessage(data)
        namespace.emit('chatMessage', data)
      })
    })
  })
})

// socketNsps.forEach((val, key) => {

//   val.on('connection', (socket) => {   
//     console.log("CONNECTED", socket.id)

//     socket.on('chatMessage', (data) => {
//       console.log("Message came >> ", data)

//       chatDao.chatMessage(data)
//       val.emit('chatMessage', data)
//     })


//   })
// })






// app.get('/send', (req, res) => {
//   namespace2.emit('chatMessage', {name: 'hello world'})

//    res.send("MESSAGE SEND ")
// })

/**
 * Socket.io 
 */

// app.use('/*', (req, res, next) => {
//    requestLogger(req, res, next)
// })

//Disable x-powered-by response header for appilcation security purpose
app.disable('x-powered-by');

//Compressing static resources
app.use(compression());


//Serving images always from public folder
app.use('/images', express.static('./client/public/images'))


// serving static files js/css only when environment is production otherwise will be dealed with Webpack-Dev-Server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))
}


//CORS congif
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

console.log(process.argv)

//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies


//API urls binded
require('./api')(app)


app.get('/', (req, res) => {
  res.send("WELCOME TO TALKO APP")
})

//404
app.use((req, res) => {
  res.status(404).json(
    {
      "statusCode": 404,
      "success": false,
      "message": "404 Not Found",

    }
    );
});


app.listen(PORT, () => {
  console.log('Running server on ' + PORT);
});

import React, { Component } from 'react';
import '../App.css';
// import { isValidEmail, isValidPassword, setCookie } from '../appUtills'
// import service from '../services'
import io from 'socket.io-client';
import {getChaHeaderImage, getChatHeaderName,getMessageSenderName} from './utils'
import Chats from './components/Chats'
import ChatMessages from './components/ChatMessages'
// import Push from 'push.js'
const socket = io.connect('http://localhost:8000/5cb5da4cf59162d209ecbcea')

  .on('connect', (data) => console.log("Connected to server", data))

// socket.on('chatMessage', (data) => {
//   console.log("chat message >> ",data)
// })

// var nameSpaces = [ ]

// var socket
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChat: 0,
      chats: [],
      user: this.props.chatsData[0].user,
      message: '',

    }

  }
  componentDidMount() {
    // Push.create('Someone send you a message', {
    //   body: "How are you doing today ??  ",
    //   icon: '/favicon.ico'
    // }).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  componentWillMount() {
    console.log("component will mount")

    // io.connect(`http://localhost:8000/test`)
    // this.props.chatsData.forEach(element => {

    //     nameSpaces.push({
    //       nameSpaceObj: io.connect(`http://localhost:8000/${element._id}`)
    //     })

    // });

    this.setState({
      chats: this.props.chatsData[this.state.currentChat].messages
    })

    // socket = io.connect(`http://localhost:8000/${this.props.chatsData[0]._id}`) 
    // socket = io(`http://localhost:8000/5cb5da4cf59162d209ecbcea`) 


    // socket.on('connect', (server) => {

    //  console.log("Connected to namespace")

    // })

    socket.on('chatMessage', (data) => {
      console.log("MESSAGE came ", data)
      let chatsData = []
      chatsData = this.state.chats
      chatsData.push(data)

      this.setState({
        chats: chatsData
      })

    })
  }


  handleChatSend = () => {
    // console.log("came here ")
    // console.log(this.props.chatsData)
    let message = {
      chatId: this.props.chatsData[0]._id,
      sentAt: Date.now(),
      sentBy: this.state.user,
      messageType: 'text',
      chatMessage: this.state.message,
      // receivedBy: {
      //   userId: '5cb47778df1ade7225013e44',
      //   receivedAt: Date.now()
      // }
    }

    socket.emit('chatMessage', message)
  }

  handleMessageChange = (e) => {

    this.setState({
      message: e.target.value
    }, () => {
      console.log(this.state.message)
    })


  }

  render() {
  
    let { chatsData } = this.props
    let { chats, currentChat, user } = this.state
    return (
      <div > 
        <Chats chatsData={chatsData} user={user}/>
        <ChatMessages 
          chatsData={chatsData} 
          user={user} 
          currentChat={currentChat} 
          chats={chats} 
          handleMessageChange={this.handleMessageChange} 
          handleChatSend={this.handleChatSend}
          />
      </div>
    );
  }
}

export default Main;

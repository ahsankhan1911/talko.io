import React, { Component } from 'react';
import '../App.css';
import { isValidEmail, isValidPassword, setCookie } from '../utills'
import service from '../services'
import io from 'socket.io-client';
import Push from 'push.js'
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
    chats: this.props.chatsData[0].messages,
    user: this.props.chatsData[0].user,
    message : ''
    }

  }
  componentDidMount () {
    Push.create('Someone send you a message', {
      body: "How are you doing today ??  ",
      icon: '/favicon.ico'
    }).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
  }

  componentWillMount () {
    console.log("component will mount")
   
    // io.connect(`http://localhost:8000/test`)
    // this.props.chatData.forEach(element => {

    //     nameSpaces.push({
    //       nameSpaceObj: io.connect(`http://localhost:8000/${element._id}`)
    //     })
      
    // });

    this.setState({
      chats: this.props.chatsData[0].messages
    })

    // socket = io.connect(`http://localhost:8000/${this.props.chatsData[0]._id}`) 
    // socket = io(`http://localhost:8000/5cb5da4cf59162d209ecbcea`) 

    
    socket.on('connect', (server) => {

     console.log("Connected to namespace")
         
    })

    socket.on('chatMessage', (data) => {
      console.log("MESSAGE came ", data)
      let chatData = []
      chatData = this.state.chats
      chatData.push(data)

      this.setState({
        chats: chatData
      })

    } )
  }


  handleChatSend = () => {
    // console.log("came here ")
// console.log(this.props.chatsData)
    let message = {
      chatId: this.props.chatsData[0]._id,
      sentAt: Date.now(),
      sentBy: this.state.user ,
      messageType: 'text',
      chatMessage: this.state.message,
      // receivedBy: {
      //   userId: '5cb47778df1ade7225013e44',
      //   receivedAt: Date.now()
      // }
    }

    socket.emit('chatMessage' , message)
  }

  handleMessageChange = (e) => {

    this.setState({
    message: e.target.value
    }, () => {
      console.log(this.state.message)
    })


  }
  
  render() {
    // console.log("Main rendered", this.state.chats)
    return (
      <div className="App">
         <ol   id="chats">
           {
             this.state.chats.length ? this.state.chats.map((d, i) => {
              
              return (
                <li key={i}><b>{this.props.chatsData[0].createdBy._id === d.sentBy ? this.props.chatsData[0].createdBy.name :this.props.chatsData[0].acceptedBy[0].name}</b>: {d.chatMessage}</li>
              )
             }) : <li>no messages so far</li>
           }
         </ol>
         <input placeholder="type your message..." type="text" name="message" onChange={this.handleMessageChange} style={{width: '300px', height: '40px', fontSize: '15px'}} /> <span><button onClick={this.handleChatSend} style={{width: '55px', height: '45px' ,fontSize: '15px'}}>send</button></span>
      </div>
    );
  }
}

export default Main;

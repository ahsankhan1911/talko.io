import React, { Component } from 'react';
import '../App.css';
import { isValidEmail, isValidPassword, setCookie } from '../utills'
import service from '../services'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8000/5cb5da4cf59162d209ecbcea')

.on('connection', () => console.log("Connected to server"))

// var nameSpaces = [ ]

// var socket
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    chats: [],
    user: this.props.chatsData[0].user,
    message : ''
    }

  }

  componentWillMount () {
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

    
    socket.on('connection', (server) => {

     console.log("Connected to namespace")
         
    })

    socket.on('chatMessage', (data) => {
      console.log("MESSAGE came ", data)
      let chatData = []
      chatData = this.state.chats
      chatData.push({
        name: data.sentBy,
        message: data.message
      })

      this.setState({
        chats: chatData
      })

    } )

   


  }


  handleChatSend = () => {
    console.log("came here ")

    let message = {
      sendAt: Date.now(),
      sendBy: this.state.user,
      messageType: 'text',
      message: this.state.message
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
    console.log("Main rendered", this.state.chats)
    return (
      <div className="App">
         <ol id="chats">
           {
             this.state.chats.length? this.state.chats.map((d, i) => {
              
              return (
                <li><b>{d.name}</b>: {d.message}</li>
              )
             }) : <li>say hi to your new friend</li>
           }
         </ol>
         <input placeholder="type your message..." type="text" name="message" onChange={this.handleMessageChange} style={{width: '300px', height: '40px', fontSize: '15px'}} /> <span><button onClick={this.handleChatSend} style={{width: '55px', height: '45px' ,fontSize: '15px'}}>send</button></span>
      </div>
    );
  }
}

export default Main;

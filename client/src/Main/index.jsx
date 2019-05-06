import React, { Component } from 'react';
import '../App.css';
import io from 'socket.io-client';
import Chats from './components/Chats/'
import ChatMessages from './components/ChatMessages'


var sockets = []

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChat: 0,
      chatsDataClient: [],
      user: this.props.chatsData[0].user,
      message: '',

    }

    this.props.chatsData.forEach(element => {

      sockets.push(io.connect(`${process.env.REACT_APP_SOCKET_URL}${element._id}`))

    });

  }

  componentWillMount() {

    this.setState({
      chatsDataClient: this.props.chatsData
    })

    sockets.forEach((element, i) => {

      element.on('chatMessage', (data) => {
        let chatsData = []
        chatsData = this.state.chatsDataClient
        chatsData[i].messages.push(data)

        this.setState({
          chatsDataClient: chatsData
        })

      })
    })
  }


  handleChatSend = (index) => {
    let message = {
      chatId: this.props.chatsData[index]._id,
      sentAt: Date.now(),
      sentBy: this.state.user,
      messageType: 'text',
      chatMessage: this.state.message,

    }

    sockets[index].emit('chatMessage', message)
  }

  handleMessageChange = (e) => {

    this.setState({
      message: e.target.value
    }, () => {
      console.log(this.state.message)
    })


  }

  /**
   when user click on specific chat 
  */
  handleChatClick = (chatIndex) => {

    this.setState({
      currentChat: chatIndex,
      chats: this.props.chatsData[chatIndex].messages
    })
  }

  render() {

    let { chatsData } = this.props
    let { chatsDataClient, currentChat, user } = this.state
    return (
      <div >
        <Chats chatsData={chatsData} user={user} handleChatClick={this.handleChatClick} />
        <ChatMessages
          chatsDataClient={chatsDataClient}
          user={user}
          currentChat={currentChat}
          handleMessageChange={this.handleMessageChange}
          handleChatSend={this.handleChatSend}
        />
      </div>
    );
  }
}

export default Main;

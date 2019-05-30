import React, { Component } from 'react';
import '../App.css';
import io from 'socket.io-client';
import Search from './components/Search';
import service from '../services';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Chat from './components/Chat';


var sockets = []

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentChat: 0,
      chatsDataClient: [],
      user: this.props.chatsData[0] ? this.props.chatsData[0].user : '',
      message: '',
      searchKey: '',
      searchData: '',
      currentComponent: ''

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

  handleSearchKey = (e) => {

    this.setState({
      searchKey : e.target.value
    }, () => {

          this.setState({
            currentComponent: this.state.searchKey ? 'search' : ''
          })

    })

  }

  handleSearch = () => {
    service.search(this.state.searchKey, this.props.token)
    .then((result) => {
        this.setState({
          searchData: result 
        })
    })
  }

  componentNavigator = () => {
    let { chatsData } = this.props
    let { chatsDataClient, currentChat, user } = this.state
    switch ( this.state.currentComponent) {
      case'search':
      return <Search data = {this.state.searchData}/>

      case 'profile': 
      return <Profile/>

      case 'settings': 
      return <Settings/> 

      default: 
      return <Chat  
              currentChat = {currentChat}
              chatsData={chatsData} 
              user={user} 
              handleChatClick={this.handleChatClick} 
              chatsDataClient={chatsDataClient}
              handleMessageChange={this.handleMessageChange}
              handleChatSend={this.handleChatSend}
              />
    }
  }

  render() {
    return (
      <div >
        <input type="text" placeholder="search..." onChange ={ this.handleSearchKey} onKeyUp ={ this.handleSearch } />
        {this.componentNavigator()}
      </div>
    );
  }
}


export default Main;

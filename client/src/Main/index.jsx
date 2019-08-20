import React from 'react';
import '../App.css';
import io from 'socket.io-client';
import Search from './components/Search';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Chat from './components/Chat';
import EventHandlers from './EventHandlers'

var sockets = []

class Main extends EventHandlers {

  constructor(props) {
    super(props);


    this.state = {
      currentChat: 0,
      chatsDataClient: [],
      user: this.props.chatsData[0] ? this.props.chatsData[0].user : '',
      message: '',
      searchKey: '',
      searchData: '',
      currentComponent: '',
      profileData: '',
      isUser: true

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


  componentNavigator = () => {
    let { chatsData } = this.props
    let { chatsDataClient, currentChat, user } = this.state
    switch (this.state.currentComponent) {
      case 'search':
        return <Search 
          data={this.state.searchData}  
          handleProfileClick = {this.handleProfileClick}
          user={user}
          />

      case 'profile':
        return <Profile data = {this.state.profileData} isUser={this.state.isUser} 
        handleAddAsFriendBtn={this.handleAddAsFriendBtn}/>

      case 'settings':
        return <Settings />

      default:
        return <Chat
          currentChat={currentChat}
          chatsData={chatsData}
          user={user}
          handleChatClick={this.handleChatClick}
          chatsDataClient={chatsDataClient}
          handleMessageChange={this.handleMessageChange}
          handleChatSend={this.handleChatSend}
          handleLogout = {this.handleLogout}
          handleProfileBtn = {this.handleProfileBtn}
          sockets ={sockets}
        />
    }
  }

  render() {
    return (
      <div >
        <input type="text" placeholder="search..." onChange={this.handleSearchKey} onKeyUp={this.handleSearch} />
        <span style={{ float: 'right' }}><button onClick={this.handleLogout}>logout</button></span>
        <span style={{ float: 'right' }}><button onClick={this.handleProfileBtn}>profile</button></span>
        {this.componentNavigator()}
      </div>
    );
  }
}


export default Main;

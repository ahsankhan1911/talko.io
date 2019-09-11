import React from 'react';
import '../App.css';
import io from 'socket.io-client';
import Search from './components/Search';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Chat from './components/Chat';
import Contacts from './components/Contacts'
import EventHandlers from './EventHandlers'
import service from '../services';

var sockets = []

class Main extends EventHandlers {

  constructor(props) {
    super(props);

    if(Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    console.log("HERER ", Notification.permission)
    var options = {
      body: 'hello world',
      // icon: icon
  };
 
    // var notification = new Notification(`You have new contact request`, options)


    this.state = {
      currentChat: 0,
      chatsDataClient: [],
      user: this.props.chatsData[0] ? this.props.chatsData[0].user : '',
      message: '',
      searchKey: '',
      searchData: '',
      currentComponent: '',
      profileData: '',
      isUser: true,
      requestList: []

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

      case 'contacts' :
        return <Contacts 
        requestList = {this.state.requestList}
        handleAcceptReqBtn= {this.handleAcceptReqBtn}
        />

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
        <span style={{ float: 'right' }}><button onClick={this.handleContactBtn}>contacts</button></span>

        {this.componentNavigator()}
      </div>
    );
  }
}


export default Main;

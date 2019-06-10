import React, { Component, Fragment } from 'react';
import ChatMessages from './components/ChatMessages'
import Chats from './components/Chats'


class Chat extends Component {

    render() {
        
    let { chatsData, sockets , chatsDataClient, currentChat, user , handleChatClick ,handleMessageChange,handleChatSend,handleLogout,handleProfileBtn} = this.props
        return (
               chatsData.length ?  
      <Fragment>
       
      <Chats chatsData={chatsData} user={user} handleChatClick={handleChatClick} />
      <ChatMessages
        chatsDataClient={chatsDataClient}
        user={user}
        currentChat={currentChat}
        handleMessageChange={handleMessageChange}
        handleChatSend={handleChatSend}
        handleLogout = {handleLogout}
        handleProfileBtn = {handleProfileBtn}
        sockets= {sockets}
      /> </Fragment>: <p>Add your friends or family to start chatting. </p>
        )
    }
}

export default Chat;
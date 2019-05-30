import React, { Component, Fragment } from 'react';
import ChatMessages from './components/ChatMessages'
import Chats from './components/Chats'


class Chat extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {

    //     }
    // }

    render() {
        
    let { chatsData , chatsDataClient, currentChat, user , handleChatClick ,handleMessageChange,handleChatSend} = this.props
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
      /> </Fragment>: <p>Add your friends or family to start chatting. </p>
        )
    }
}

export default Chat;
import React, { Component, Fragment } from 'react';
import {getChaHeaderImage, getChatHeaderName, getMessageSenderName} from '../utils'


class ChatMessages extends Component {
    constructor(props) {
        super(props);
    
      }


    render() {
        let {chatsData,currentChat, chats, user,handleMessageChange,handleChatSend } = this.props
        return (
            <Fragment>
                <ol id="chatsWindow" >
                    <div id='chatHeader' >
                        <span id="chatPhoto"> <img src={`${process.env.REACT_APP_STATIC_URL}${getChaHeaderImage(chatsData, currentChat, user)}`} /></span> <span>{getChatHeaderName(chatsData, currentChat, user)}</span>
                    </div>
                    {
                        chats.length ? chats.map((d, i) => {

                            return (
                                <li key={i}><b>{getMessageSenderName(chatsData, currentChat, d)}</b>: {d.chatMessage}</li>
                            )
                        }) : <li>no messages so far</li>
                    }
                </ol>
                <input placeholder="type your message..." type="text" name="message" onChange={handleMessageChange} style={{ width: '300px', height: '40px', fontSize: '15px' }} /> <span><button onClick={handleChatSend} style={{ width: '55px', height: '45px', fontSize: '15px' }}>send</button></span>
            </Fragment>
        )
    }

}

export default ChatMessages
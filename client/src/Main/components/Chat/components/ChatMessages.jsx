import React, { Component, Fragment } from 'react';
import { getChatHeaderImage, getChatHeaderName, getMessageSenderName, getTimeDifference, } from '../../../utils'


class ChatMessages extends Component {
  
    render() {
        let { currentChat,sockets, chatsDataClient, user, handleMessageChange, handleChatSend,handleLogout,handleProfileBtn } = this.props
        return (
            <Fragment>
                <ol id="chatsWindow" >
                    <div id='chatHeader' >
                        <span id="chatPhoto">
                            <img alt="chatHeader"
                                src={`${process.env.REACT_APP_STATIC_URL}${getChatHeaderImage(chatsDataClient, currentChat, user)}`}
                            />
                        </span>
                        <span>{getChatHeaderName(chatsDataClient, currentChat, user)}</span>
                        
                    </div>
                    {
                        chatsDataClient[currentChat].messages.length ? chatsDataClient[currentChat].messages.map((d, i) => {

                            return (
                                <li key={i}><b>{getMessageSenderName(chatsDataClient, currentChat, d)}</b>
                                    <span
                                        style={{ fontSize: '10px', color: 'grey' }}> {getTimeDifference(d.sentAt)}
                                    </span> <br /> {d.chatMessage}</li>
                            )
                        }) : <li>no messages so far</li>
                    }
                </ol>
                <input
                    placeholder="type your message..."
                    type="text" name="message"
                    onChange={handleMessageChange}
                    style={{ width: '300px', height: '40px', fontSize: '15px' }}
                /> <span>
                    <button
                        onClick={() => { handleChatSend(currentChat, sockets) }}
                        style={{ width: '55px', height: '45px', fontSize: '15px' }}>send
                      </button>
                </span>
            </Fragment>
        )
    }

}

export default ChatMessages
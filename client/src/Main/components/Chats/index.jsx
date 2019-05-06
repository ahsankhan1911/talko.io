import React, { Component } from 'react';
import {getChatsImage, getChatsName,getLastMessageSenderName} from '../../utils'


class Chats extends Component {
    constructor(props) {
        super(props);
    
      }


    render () {
        let {chatsData, user, handleChatClick} = this.props
        return (
            <div id="chats">
            <ol style={{listStyleType: 'none'}}>
              {
                chatsData.length ?
                  chatsData.map((d, i) => {
                    return (
                      <li onClick={() => { handleChatClick(i)}} key={i} style={{cursor: 'pointer'}}><span id='chating'>
                        <img src={`${process.env.REACT_APP_STATIC_URL}${getChatsImage(d, user)}`} />
                      </span>{getChatsName(d, user)}<p style={{fontSize: '10px'}}>{getLastMessageSenderName(d, user)}: {d.messages[d.messages.length-1].chatMessage} </p> <hr/></li>
                    )
                  })
                  : <li>no chats</li>
              }
  
            </ol>
          </div>
        )
    }
}

export default Chats
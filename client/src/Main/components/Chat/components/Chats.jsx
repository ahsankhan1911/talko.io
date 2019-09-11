import React, { Component } from 'react';
import {getChatsImage, getChatsName,getLastMessageSenderName} from '../../../utils'


class Chats extends Component {
    
    render () {
        let {chatsData, user, handleChatClick} = this.props
      console.log(chatsData)

        return (
            <div id="chats">
            <ol style={{listStyleType: 'none'}}>
              {
                chatsData.length ?
                  chatsData.map((d, i) => {
                    console.log("sdadas >> ", getChatsImage(d, user))
                    return (
                      <li onClick={() => { handleChatClick(i)}} key={i} style={{cursor: 'pointer'}}><span id='chating'>
                        <img alt="chatsImages" src={`${process.env.REACT_APP_STATIC_URL}${getChatsImage(d, user)}`} />
                      </span>{getChatsName(d, user)}<p style={{fontSize: '10px'}}>{getLastMessageSenderName(d, user)} {d.messages[d.messages.length-1] ? d.messages[d.messages.length-1].chatMessage : `Say Hi to your friend ${d.createdBy.name}`} </p> <hr/></li>
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
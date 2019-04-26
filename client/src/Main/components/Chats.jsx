import React, { Component } from 'react';
import {getChatsImage, getChatsName} from '../utils'


class Chats extends Component {
    constructor(props) {
        super(props);
    
      }


    render () {
        let {chatsData, user} = this.props
        return (
            <div id="chats">
            <ol style={{listStyleType: 'none'}}>
              {
                chatsData.length ?
                  chatsData.map((d, i) => {
                    return (
                      <li key={i} style={{cursor: 'pointer'}}><span id='chating'>
                        <img src={`${process.env.REACT_APP_STATIC_URL}${getChatsImage(d, user)}`} />
                      </span>{getChatsName(d, user)}</li>
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
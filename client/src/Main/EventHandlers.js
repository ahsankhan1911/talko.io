import { Component } from 'react';
import service from '../services';
import io from 'socket.io-client';

var globalSocket = io.connect(process.env.REACT_APP_SOCKET_URL)

globalSocket.on('idUpdated', (data) => {
    let {socketId} = data      
    service.updateSocketId({socketId}).then(() => {



      return console.log('Id updated to ', socketId)
    })

  })

  globalSocket.on('contactReq', (data) => {
    var notification = new Notification(`You have new contact request`)



  })


class EventHandlers extends Component {

    constructor (props) {
    super(props);

    
    }
    handleChatSend = (index, sockets) => {
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
            searchKey: e.target.value
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

    handleProfileClick = (userEmail) => {
        service.userDetailsEmail(userEmail)

            .then((result) => {
                this.setState({
                    profileData: result
                }, () => {

                    this.setState({
                        currentComponent: 'profile', 
                        isUser: false
                    })
                })
            })

    }

    handleLogout = () => {
        service.logout()
    }

    handleProfileBtn = () => {
        this.setState({
            currentComponent: 'profile',
            isUser: true 
        })
        service.userProfileAPI().then((result) => {

            this.setState(({
                profileData: result,

            }))
        })

    }

    handleContactBtn = () => {
        this.setState({
            currentComponent: 'contacts',
            isUser: true 
        })
        service.getContactReq().then((result) => {
console.log("contact result >> ", result)
            this.setState(({
                requestList: result,

            }))
        })
    }

    handleAddAsFriendBtn = (userData) => {
        console.log("ADD DATA >> ", userData)
        let message = prompt(`Send a message to ${userData.data.name}` )
        let data = {
            receiverId: userData.data._id,
            requestMessage: message
        }
        service.sendContactReq(data).then((result) => {
            // alert(result.message)
            globalSocket.emit('contactReqSend', {socketId: result.receiver.socketId, userId: result.receiver._id})
        })
    }


    handleAcceptReqBtn = (userData) => {
          service.acceptContactReq(userData).then((result) => {
               return alert(`${result.name} is now your contact`)
          })

    }
    

}

export default EventHandlers;
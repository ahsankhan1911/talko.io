import { Component } from 'react';
import service from '../services';

class EventHandlers extends Component {

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

    handleAddAsFriendBtn = (userData) => {
        let message = prompt(`Send a message to ${userData.data.name}` )
        let data = {
            receiverId: userData.data._id,
            requestMessage: message
        }
        service.sendContactReq(data).then((result) => {
            alert(result.message)
        })
    }

}

export default EventHandlers;
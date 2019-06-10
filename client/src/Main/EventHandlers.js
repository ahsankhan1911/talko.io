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
                        currentComponent: 'profile'
                    })
                })
            })

    }

    handleLogout = () => {
        service.logout()
    }

    handleProfileBtn = () => {
        this.setState({
            currentComponent: 'profile'
        })
        service.userProfileAPI().then((result) => {

            this.setState(({
                profileData: result,

            }))
        })

    }

}

export default EventHandlers;
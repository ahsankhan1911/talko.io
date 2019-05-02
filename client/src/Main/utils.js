

var  getChatHeaderName = (chatsData,currentChat,user) => {
  if(chatsData[currentChat]) {
    if (chatsData[currentChat].chatType === 'group') {

      return chatsData[currentChat].groupName
    }
    else {
      if (chatsData[currentChat].createdBy._id === user) {
        return chatsData[currentChat].acceptedBy[0].name
      }
      else {
        return chatsData[currentChat].createdBy.name
      }
    }
  }
  
   return ''

  }

 var getChaHeaderImage = (chatsData,currentChat,user ) => {
  if(chatsData[currentChat]) {

    if (chatsData[currentChat].chatType === 'group') {

      return chatsData[currentChat].groupImage
    }

    else {
      if (chatsData[currentChat].createdBy._id === user) {
        return chatsData[currentChat].acceptedBy[0].profilePicture
      }
      else {
        return chatsData[currentChat].createdBy.profilePicture
      }
    }
  }

  return ''

  }

 var getChatsName = (data,user) => {
   if(data) {
    if (data.chatType === 'group') {
      return data.groupName
    }
    else {
      if (data.createdBy._id === user) {
        return data.acceptedBy[0].name
      }
      else {
        return data.createdBy.name
      }
    }

   }
   
   return ''

   
  }

 var getChatsImage = (data, user) => {
  if(data) {
    if (data.chatType === 'group') {
      return data.groupImage
    }
    else {
      if (data.createdBy._id === user) {
        return data.acceptedBy[0].profilePicture
      }
      else {
        return data.createdBy.profilePicture
      }
    }
  }

  return ''
  }

  var getMessageSenderName = (chatsData, currentChat, data) => {
    if(chatsData[currentChat]) {
   return chatsData[currentChat].createdBy._id === data.sentBy ? 
          chatsData[currentChat].createdBy.name : 
          chatsData[currentChat].acceptedBy[0].name
    }
    return ''
  }

  export {
    getChatHeaderName,
    getChaHeaderImage,
    getChatsName,
    getChatsImage,
    getMessageSenderName
  }
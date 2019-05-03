

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

  //Chats time Difference
function getTimeDifference(givenTime) {
	givenTime = new Date(givenTime);
	const milliseconds = new Date().getTime() - givenTime.getTime();
	const numberEnding = number => {
	  return number > 1 ? 's' : '';
	};
	const number = num => (num > 9 ? '' + num : '0' + num);
	const getTime = () => {
	  let temp = Math.floor(milliseconds / 1000);
	  const years = Math.floor(temp / 31536000);
	  if (years) {
		const month = number(givenTime.getUTCMonth() + 1);
		const day = number(givenTime.getUTCDate());
		const year = givenTime.getUTCFullYear() % 100;
		return `${day}-${month}-${year}`;
	  }
	  const days = Math.floor((temp %= 31536000) / 86400);
	  if (days) {
		if (days < 28) {
		  return days + ' day' + numberEnding(days);
		} else {
		  const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		  ];
		  const month = months[givenTime.getUTCMonth()];
		  const day = number(givenTime.getUTCDate());
		  return `${day} ${month}`;
		}
	  }
	  const hours = Math.floor((temp %= 86400) / 3600);
	  if (hours) {
		return `${hours} hour${numberEnding(hours)} ago`;
	  }
	  const minutes = Math.floor((temp %= 3600) / 60);
	  if (minutes) {
		return `${minutes} minute${numberEnding(minutes)} ago`;
	  }
	  return 'just now';
	};
	return getTime();
  }


  export {
    getChatHeaderName,
    getChaHeaderImage,
    getChatsName,
    getChatsImage,
    getMessageSenderName,
    getTimeDifference
  }
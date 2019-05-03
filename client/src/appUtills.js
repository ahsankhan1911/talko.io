	import randomstring from 'randomstring';

function isValidEmail(email){
	// eslint-disable-next-line
	var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
	return new RegExp(pattern).test(email);
}

function isValidPassword(password){
	var pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/;
	return new RegExp(pattern).test(password);
}


function getRandomNumber(){
	return randomstring.generate({charset:'numeric', length:11});
}

function capitalizeFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function getRandomOtp(length){
	var randomNumber =randomstring.generate({charset:'numeric', length:length? length:4});
	if( randomNumber < 1000 && length === 4) {
		
		return getRandomOtp()
	}

	else {
		return randomNumber
	
	}	 
}


function insertAtString(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}


function digitsCount(n) {
	var count = 0;
	if (n >= 1) ++count;
  
	while (n / 10 >= 1) {
	  n /= 10;
	  ++count;
	}
  
	return count;
	}
	

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}




//========================== Export Module Start ==========================
export {
	isValidEmail,
	isValidPassword,
	getRandomNumber,
	capitalizeFirstLetter,
	getRandomOtp,
	insertAtString,
	digitsCount,
	setCookie,
	getCookie,
	eraseCookie,
}
//========================== Export Module End ============================
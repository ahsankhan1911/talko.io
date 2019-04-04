
const appUtils = require('../../lib/appUtils'),
_ = require('lodash'),
userDao = require('./userDao'),
customException = require('../../lib/customException'),
constant = require('../../lib/constant');
const {uploadForUser} = require('../../lib/multer')




var uploadUserProfilePicture =   uploadForUser.single('userProfilePicture')


var validateSignUp = function(request, response, next){
let {name, email, password,gender} = request.body;
var errors = [];
var genders = ['male', 'female','other']

if(_.isEmpty(name)){
  errors.push({fieldName:'name', message:"Please enter your name"});
}
email = _.toLower(email);
if(_.isEmpty(email)){
  errors.push({fieldName:'email', message:"Please enter your email"});
}
if(!appUtils.isValidEmail(email)){
  errors.push({fieldName:'email', message:"Please provide a valid email"});
}
if(_.isEmpty(password)){
  errors.push({fieldName:'password', message:"Please enter your password"});
}

// if(!genders.find((gen) => gen === gender)){
// 	errors.push({fieldName:'gender', message:"Gender can't be other than male,female and other"});
// }

if(errors && errors.length > 0){
  validationError(errors, next);
}
next();
}

var validateProfileEdit = function (request, response, next) {
let { name } = request.body;
let file = request.file;

var errors = [];
var genders = ['male', 'female', 'other']
if (file) {
  if (_.isEmpty(name)) {
      errors.push({ fieldName: 'name', message: "Please enter your name" });
  }

}

if (errors && errors.length > 0) {
  validationError(errors, next);
}
next();
}

var authenticateUserAccesstoken = (request, response,next) => {
let {accessToken} = request.query
userDao.authenticateUserAccesstoken({accessToken}).then((result) => {
 if(result) {
     next()
 }

else {
  return next(customException.customErrorException(constant.MESSAGES.ACCESS_FORBIDDEN, null));
 }
})

}


var validationError = function(errors, next){
if(errors && errors.length > 0){
  return next(customException.customErrorException(constant.MESSAGES.VALIDATION_ERROR, errors));
}
next();
}

module.exports = {
validateSignUp,
authenticateUserAccesstoken,
uploadUserProfilePicture,
validateProfileEdit
}
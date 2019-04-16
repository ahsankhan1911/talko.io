var Exception = require('./model/Exception'),
	constant = require('./constant');

//========================== Export Module Start ==========================
module.exports = {
	internalServerErrorException: function(error){
		return new Exception(1, constant.MESSAGES.INTERNAL_SERVER_ERROR, null, 500);
	},
	unauthorizeAccessException: function(error){
		return new Exception(2, constant.MESSAGES.UNAUTHORIZED_ACCESS, error), 401;
	},
	accessForbiddenException: function(){
		return new Exception(3, constant.MESSAGES.ACCESS_FORBIDDEN, 403);
	},
	customErrorException: function(errorMessage, error, statusCode){
		return new Exception(4, errorMessage, error, statusCode);
	},
	tokenGeneratingErrorException: function(error){
		return new Exception(5, constant.MESSAGES.TOKEN_GENERATING_ERROR, error);
	},
	dataNotFoundException: function(){
		return new Exception(8, constant.MESSAGES.DATA_NOT_FOUND);
	},
	someThingWentWrongException(){
		return new Exception(11, constant.MESSAGES.SOMETHING_WENT_WRONG);
	}
}
//========================== Export Module End ============================
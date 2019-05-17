var constant = require('./constant'),
	customException = require('./customException'),
	logger = require('./logger').logger,
	APIResponse = require('./model/APIResponse');
	

function _sendResponse(response, result){
	// send status code 200
	return response.send(result);
}

function sendError(response, error){
	// if error doesn't has sc than it is an unhandled error,
	// log error, and throw intrnl server error
	if(!error.code){
		logger.error(error, "Unhandled error.");
		error = customException.internalServerErrorException(error);
		// response.status(500)
		error.statusCode = 500
		_sendResponse(response, error)
	}
	else{
		// response.status(error.statusCode)
		var result = new APIResponse(error.statusCode, error);
		delete error.statusCode
		_sendResponse(response, result);
	}
}

function handleError(error, request, response, next){
	// unhandled error
	sendError(response, error);
}

function sendSuccessWithMessage(response, result){
	var result = new APIResponse(constant.STATUS_CODE.SUCCESS, result);
	_sendResponse(response, result);
}

function sendSuccess(response, result, message){
	response.status(200)
	var result = new APIResponse(response.statusCode, result,message);
	_sendResponse(response, result);
}

//========================== Export Module Start ==========================
module.exports = {
	handleError,
	sendError,
	sendSuccess,
	sendSuccessWithMessage
}
//========================== Export Module End ============================
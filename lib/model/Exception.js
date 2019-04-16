//========================== Class Definitions Start =====================
class Exception{
	constructor(errorCode, message, errStackTrace,statusCode){
		this.code = errorCode;
		this.statusCode = statusCode
		this.message = message;
		if(errStackTrace){
			this.errors = errStackTrace;
		}
	}
}
//========================== Class Definitions End =======================

//========================== Export Module Start ==========================
module.exports = Exception;
//========================== Export Module End ============================
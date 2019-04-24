var constant = require('../constant');

//========================== Class Definitions Start =====================
class APIResponse{
	constructor(statusCode, result, message){
		this.statusCode = statusCode;
		this.message = message
		if(statusCode === 200){
			this.success = true
			result ? this.data = result: constant.EMPTY;
			
		}
		else{
			this.success = false
			result ? this.error = result: constant.EMPTY;
		}
		
		this.time = new Date().getTime();
	}
}
//========================== Class Definitions End =======================

//========================== Export Module Start ==========================
module.exports = APIResponse;
//========================== Export Module End ============================
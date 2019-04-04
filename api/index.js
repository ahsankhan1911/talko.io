const responseHandler = require('../lib/responseHandler');

userRouter = require('./user');
	
module.exports = function(app){

	app.use('/api/user', userRouter);

	// Attach ErrorHandler to Handle All Errors
	app.use(responseHandler.handleError);
}
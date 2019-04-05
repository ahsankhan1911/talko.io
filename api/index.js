const responseHandler = require('../lib/responseHandler'),

userRouter = require('./user'),
chatRouter = require('./chat');
	
module.exports = function(app){

	app.use('/api/user', userRouter);
	app.use('/api/chat', chatRouter)

	// Attach ErrorHandler to Handle All Errors
	app.use(responseHandler.handleError);
}
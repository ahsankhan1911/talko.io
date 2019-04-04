const responseHandler = require('../lib/responseHandler'),
 userRouter = require('./user'),
 pointRouter = require('./point'),
 adminRouter = require('./admin')



module.exports = function(app){
	app.use('/api/user', userRouter);
	app.use('/api/point', pointRouter);
	app.use('/api/admin', adminRouter);



	// Attach ErrorHandler to Handle All Errors
	app.use(responseHandler.handleError);
}
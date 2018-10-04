module.exports = function(app){

	app.get('/users', function(req, res){
		app.app.controllers.user.openUsersPage(app,req,res);
	});


};



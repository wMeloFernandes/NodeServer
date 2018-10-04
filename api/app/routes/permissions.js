module.exports = function(app){

	app.get('/permissions', function(req, res){
		app.app.controllers.permissions.openPermissionsPage(app,req,res);
	});


};



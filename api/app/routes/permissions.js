module.exports = function(app){

	app.get('/permissions', function(req, res){
		app.app.controllers.permissions.openPermissionsPage(app,req,res);
	});

	app.post('/approveRequest', function(req,res){
		console.log("ENTROU NO APPROVE");
		app.app.controllers.permissions.approveRequest(app,req,res);
	});


	app.post('/rejectRequest', function(req,res){
		console.log("ENTROU NO REJECT");
		app.app.controllers.permissions.rejectRequest(app,req,res);
	});
};



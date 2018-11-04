module.exports = function(app){

	app.get('/permissions', function(req, res){
		app.app.controllers.permissions.openPermissionsPage(app,req,res);
	});


	app.get('/onholdpermissions', function(req, res){
		app.app.controllers.permissions.openOnHoldPermissionsPage(app,req,res);
	});


	app.post('/approveRequest', function(req,res){
		app.app.controllers.permissions.approveRequest(app,req,res);
	});


	app.post('/rejectRequest', function(req,res){
		app.app.controllers.permissions.rejectRequest(app,req,res);
	});


	app.get('/getApprovedValue', function(req,res){
		app.app.controllers.permissions.getApprovedNumber(app,req,res);
	});

	app.get('/getOnHoldValue', function(req,res){
		console.log("DEBUG ROTA HOLD VALUE");
		app.app.controllers.permissions.getOnHoldNumber(app,req,res);
	});

	app.get('/getApprovedNumber',function(req,res){
		app.app.controllers.permissions.getApprovedAndOnHoldNumber(app,req,res);
	});

	app.post('/deleteUserPermissions',function(req,res){
		app.app.controllers.permissions.test(app,req,res);
	});
};



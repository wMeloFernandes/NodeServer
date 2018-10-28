module.exports = function(app){

	app.get('/gatesRequest', function(req, res){
		app.app.controllers.gates.gatesAPP(app,req,res);

	});

	app.post('/newUser', function(req,res){
		app.app.controllers.user.newUserAPP(app,req,res);
	});

	app.post('/openGate', function(req,res){
		res.send("Open Gate");
	});

	app.post('/userAccess', function(req,res){
		app.app.controllers.user.userAccess(app,req,res);
	});

	app.post('/recoverPassword', function(req,res){
		app.app.controllers.user.recoverUserPassword(app,req,res);
	});

	app.post('/recoverPasswordAfterChecked', function(req,res){
		console.log("Entrou na API");
		app.app.controllers.user.recoverUserPasswordAfterChecked(app,req,res);
	});	

	app.post('/getUserHistorical', function(req,res){
		console.log("DEBUG API");
		app.app.controllers.historical.getUserHistorical(app,req,res);
	});

	app.post('/getOnHoldPermissions', function(req,res){
		console.log("CHAMOU A API");
		app.app.controllers.permissions.getOnHoldPermissions(app,req,res);
	});

	app.post('/updateUserPermissionsList', function(req,res){
		app.app.controllers.user.getUserPermissions(app,req,res);
	});



};


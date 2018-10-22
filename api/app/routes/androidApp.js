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

};
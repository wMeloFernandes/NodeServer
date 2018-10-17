module.exports = function(app){

	app.get('/gatesRequest', function(req, res){
		app.app.controllers.gates.gatesAPP(app,req,res);

	});

	app.post('/newUser', function(req,res){
		res.send("New User");
	});

	app.post('/openGate', function(req,res){
		res.send("Open Gate");
	});

};



module.exports = function(app){

	app.get('/gates', function(req, res){
		app.app.controllers.gates.openGatesPage(app,req,res);
	});

	app.get('/newgate', function(req, res){
		app.app.controllers.gates.openNewGatePage(app,req,res)
	});

	app.post('/newGateRegister', function(req,res){
		app.app.controllers.gates.insertNewGate(app,req,res);
	});

};

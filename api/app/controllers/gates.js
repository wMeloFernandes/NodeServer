var rand = require("random-key");

module.exports.openGatesPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);

	gates.getGatesList(function(error,result){
		var data = {gates: result};
		console.log("WILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
		console.log(result[0]);
		console.log({gates: result});
		res.render('gates', {gates: result});
	});

}

module.exports.openNewGatePage = function(app,req,res){
	res.render('newgate');
}

module.exports.insertNewGate = function(app,req,res){
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);

	var gate = req.body;
	gates.insertNewGate(gate, function(error,result){
		console.log("Gate inserted")
		gates.getGatesList(function(error,result){
			res.redirect('/gates');
		});
	});

}

module.exports.gatesAPP = function(app,req,res){
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);

	gates.getGatesList(function(error,result){
		res.send({gates: result});
	});	
}

module.exports.deleteGate = function(app,req,res){
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);

	var gate = req.body;

	gates.deleteGate(gate,function(error,result){
		res.send(result);
	});	
}

module.exports.generateKey = function(app,req,res){
	var key = rand.generate();
	console.log(key);
	res.send(key);
}

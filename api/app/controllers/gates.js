module.exports.openGatesPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);

	gates.getGatesList(function(error,result){
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
			res.render('gates', {gates: result});
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

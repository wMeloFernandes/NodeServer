var rand = require("random-key");

module.exports.openGatesPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);

	gates.getGatesList(function(error,result){
		var data = {gates: result};
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

module.exports.updateGateLastAccess = function(app,req,res){
	console.log("updateGateLastAccess CONTROLLER");
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);

	var gate = req.body;

	gates.updateGateLastAccess(gate,function(error,result){
		console.log(result)
		if(result.length>0){
			res.send({status: 200});
		}else{
			res.send({status: 500});
		}
	});
}

module.exports.gatesAPPByID = function(app,req,res){
	var connection = app.config.dbConnection();
	var gates = new app.app.models.GateDAO(connection);
	var users = new app.app.models.UserDAO(connection);

	var data = req.body;
	var permissions;
	users.getUserPermissions(data,function(error,result){
		permissions = result.RowDataPacket.permissions;
		console.log(permissions)
	});




	gates.getGatesList(function(error,result){
		res.send({gates: result});
	});	
}

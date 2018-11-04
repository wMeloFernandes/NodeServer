var objectMapper = require('object-mapper');

module.exports.openPermissionsPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	permissions.getApprovedList(function(error, result){
		console.log("WILLLLLL");
		console.log({permission: result});
		res.render('permissions', {permissions: result});
	});
}

module.exports.openOnHoldPermissionsPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);	

	permissions.getOnHoldList(function(error,result){
		res.render('onholdpermissions',{permissions: result});
	});
}

module.exports.getApprovedPermissions = function(app,req,res){

	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	permissions.getApprovedList(function(error, result){
		console.log("RESULTAO: "+result);
	});
}

module.exports.getOnHoldPermissions = function(app,req,res){

	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	var permission = req.body;
	console.log(permission);

	permissions.getOnHoldPermissions(permission,function(error,result){
		res.send({permissions: result});
	});	
}

module.exports.insertNewRequest = function(app,req,res){
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	var permission = req.body;
	var data = {user_id: permission.user_id,
    			gate_id: permission.gate_id,
    			gate_name: permission.gate_name,
    			status: 1};

    permissions.insertNewRequest(data,function(error,result){
    	if(result.affectedRows==1){
    		res.send({status: 200});
    	}else{
    		res.send({status: 500});
    	}
    });
}

module.exports.approveRequest = function(app,req,res){
	console.log("APPROVE CONTROLLER");
	
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);
	var users = new app.app.models.UserDAO(connection);
	
	var permission = req.body;
	console.log(permission.requisition_id);

	permissions.approveRequest(permission,function(error,result){
		
		if(result.affectedRows==1){
			permissions.getGateID(permission,function(error,result){
				var gateJSON = {gate_id: result[0].gate_id,
								requisition_id: permission.requisition_id};
				console.log(gateJSON);
				permissions.getUserID(gateJSON,function(error,result){
					console.log(result[0].user_id);
					var userJSON = {gate_id: gateJSON.gate_id,
									user_id: result[0].user_id};
					console.log("WILL");
					console.log(userJSON);
					users.getUserPermissions(userJSON,function(error,result){
						var newPermissions = result[0].permissions + ','+ userJSON.gate_id;						

						var finalRequisition = {user_id: userJSON.user_id,
												permissions: newPermissions};
						users.updateUserPermission(finalRequisition,function(error,result){
						});
					});
				});
			});
		}
	});
}

module.exports.rejectRequest = function(app,req,res){
	console.log("REJECT CONTROLLER");

	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	var permission = req.body;
	console.log("REQUISITION_ID "+permission.requisition_id);
	permissions.rejectRequest(permission,function(error,result){
	});
}


module.exports.getApprovedAndOnHoldNumber = function(app,req,res){
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	permissions.getApprovedNumber(function(error,result){
		var data = {approved: result.length};
		console.log(data);
		permissions.getOnHoldNumber(data,function(error,result){
			console.log(result.length);
			var approvedData = data.approved;
			var onHoldData = result.length;
			var permission ="{permission:\n approved:"+approvedData+",\nonHold:"+onHoldData+"}"; 
			console.log("AOOOOOOOOOOOOOOOOOOOOOOO");
			console.log(permission);
			res.render('home');
		});
	});	
}

module.exports.getApprovedNumber =function(app,req,res){
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	permissions.getApprovedNumber(function(error,result){
		console.log(result.length);
		var value = result.length;
		res.send(value.toString());
	});
}

module.exports.getOnHoldNumber = function(app,req,res){
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	permissions.getOnHoldNumberValue(function(error,result){
		console.log(result.length);
		var value = result.length;
		res.send(value.toString());
	});
}



      
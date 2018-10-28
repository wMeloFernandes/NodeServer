module.exports.openPermissionsPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	permissions.getApprovedList(function(error, result){
		console.log("RESULTAO: "+result);
		console.log(result[0]);
		res.render('permissions', {permissions: result});
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
	console.log("ENTROU NO CONTROLLER");
	
	var connection = app.config.dbConnection();
	var permissions = new app.app.models.PermissionsDAO(connection);

	var permission = req.body;
	console.log(permission);

	permissions.getOnHoldPermissions(permission,function(error,result){
		res.send({permissions: result});
	});	
}

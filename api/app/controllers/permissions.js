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

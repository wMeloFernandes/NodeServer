var crypto = require('crypto');

module.exports.openUsersPage = function(app,req,res){
	console.log("OPEN USERS PAGE CONTROLLER DEBUG");
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	users.getUsersList(function(error,result){
	console.log("GETUSERSLIST DEBUG");
	console.log(result);
		res.render('users', {users: result});
	});
}

module.exports.newUser = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);
	var user = req.body;
	
	var data = {username: user.username ,
				password: crypto.createHash('md5').update(user.password).digest('hex'),
				email: user.email,
				permissions: "0"};

	users.insertNewUser(data,function(error,result){
		console.log("User inserted");
		users.getUsersList(function(error,result){
			res.redirect('users');
		});
	});

}


module.exports.newUserAPP = function(app,req,res){
	console.log("newUserAPP");
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);
	var user = req.body;

	var data = {username: user.username,
				password: crypto.createHash('md5').update(user.password).digest('hex'),
				email: user.email,
				permissions: "0"};


	users.checkIfEmailIsAlreadyRegistered(data,function(error,result){
		if(result.length>0){
			console.log(result.length);
			var answer = {status: 409,
						user_id: 0};
			res.send(answer);
		}else{
			users.insertNewUser(data,function(error,result){
				console.log(result);
				users.getOneUser(data,function(error,result){
					console.log("Entrou segundo callback");
					var answer = {status: "200",
								user_id: result[0].user_id,
								username: result[0].username,
								last_access: result[0].last_access,
								email:result[0].email };
					res.send(answer);
				});
			});		
		}
	});
}

module.exports.userAccess = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;
	var data = {password: crypto.createHash('md5').update(user.password).digest('hex'),
				email: user.email};

	console.log("DEBUG ENTROU");
	users.getUserAccess(data,function(error,result){

		if(result.length>0){
			users.getAllUserInformations(data,function(error,result){
				var answer = {status: 200,
						user_id: result[0].user_id,
						username: result[0].username,
						last_access: result[0].last_access,
						email:result[0].email,
						permissions: result[0].permissions };
				console.log(answer);		
				res.send(answer);
			});
		}else{
			res.send({status: 404,
						user_id: "",
						username: "",
						last_access: "",
						email: "" ,
						permissions: ""});
		}

	});
}	


module.exports.recoverUserPassword = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;

	users.getUserByRecover(user,function(error,result){
		if(result.length>0){
			res.send({status: 200});
		}else{
			res.send({status: 404});
		}
	});		
}

module.exports.recoverUserPasswordAfterChecked = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;
	var data = {user_id: user.user_id,
				password: crypto.createHash('md5').update(user.password).digest('hex')};

	users.updateUserPassword(data,function(error,result){
		if(result.affectedRows==1){
			users.getUserRecover(data,function(error,result){
				var answer = {status: 200,
							user_id: result[0].user_id,
							username: result[0].username,
							last_access: result[0].last_access,
							email:result[0].email };
				res.send(answer);
					
			});
		}else{
			var answer = {status: 500,
						user_id: "",
						username: "",
						last_access: "",
						email: ""};
			res.send(answer);			
		}

	});
}

module.exports.getUserPermissions = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;

	users.getUserPermissions(user,function(error,result){
		console.log(result[0].permissions);
		res.send({permissions: result[0].permissions});
	});	
}

module.exports.deleteUser = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;

	users.deleteUser(user,function(error,result){
		console.log("DELETANDO USUARIO DEBUG");
		console.log(result);
		res.send(result);
	});	
}

module.exports.getUserPermissionsListNFC = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;
	console.log(user);

	users.getUserPermissions(user,function(error,result){
		console.log(result);
		var data = result[0].permissions;
		console.log(data);
		var answer = data.includes(user.gate_id);
		if(answer==true){
			var nfcToken = user.user_id+user.gate_id+'81D95CC';//Last = key
			nfcToken = crypto.createHash('md5').update(nfcToken).digest('hex');
			nfcToken = nfcToken.substring(0,7);
			console.log(nfcToken);
			var test = crypto.createHash('md5').update("hello world").digest('hex');
			console.log(test)
			var data2 = {result: 200,
						message: nfcToken};
		}else{
			var data2 = {result:404,
						message: ""};
		}
		res.send(data2);
	});
}

module.exports.updateUserLastAccess = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);
	console.log("updateUserLastAccess Controller");
	var user = req.body;
	console.log(user);

	users.updateUserLastAccess(user,function(error,result){
		//console.log(result);
		console.log(result.affectedRows);
		if(result.length>0){
			res.send({status: 200});
		}else{
			res.send({status: 500});
		}
	});
}

var crypto = require('crypto');

module.exports.openUsersPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	users.getUsersList(function(error,result){
		console.log(result);
		res.render('users', {users: result});
	});
}

module.exports.newUser = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);
	
	var password = req.body.password;
	var newPassword = crypto.createHash('md5').update(password).digest('hex');

	var data = {username: req.body.username,
				password: newPassword,
				permissions: req.body.permissions,
				email: req.body.email};

	users.insertNewUser(data,function(error,result){
		console.log("User inserted");
		users.getUsersList(function(error,result){
			res.render('users', {users: result});
		});
	});

}


module.exports.newUserAPP = function(app,req,res){
	console.log("newUserAPP");
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);
	var user = req.body;

	users.insertNewUser(user,function(error,result){
		res.render(result);
	});

}

module.exports.userAccess = function(app,req,res){
	console.log("userAccess");

	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;

	users.getUserAccess(user,function(error,result){
		//console.log(result.body.password);

		if(result.length>0){
			if(user.password==result[0].password){
				res.send(200);
			}else{
				res.send(401);
			}

		}else{
		res.send(404);
		}

	});
}	

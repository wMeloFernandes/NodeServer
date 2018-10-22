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
	var user = req.body;
	var password = user.password;
	var test = crypto.createHash('md5').update(password).digest('hex');
	console.log("PASSWORD "+test);

	users.insertNewUser(user,function(error,result){
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
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}

		}else{
		res.sendStatus(404);
		}

	});
}	

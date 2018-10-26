var crypto = require('crypto');

module.exports.openUsersPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	users.getUsersList(function(error,result){
		console.log(result);
		//res.render('users', {users: result});
		res.send(result);
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

	var data = {username: user.username,
				password: crypto.createHash('md5').update(user.password).digest('hex'),
				permissions: user.permissions,
				email: user.email};



	users.insertNewUser(data,function(error,result){
		users.getOneUser(data,function(error,result){
			var data = {status: "200"}
			res.send(data);
		});
	});

}

module.exports.userAccess = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	var user = req.body;
	var data = {password: crypto.createHash('md5').update(user.password).digest('hex'),
				email: user.email};

	users.getUserAccess(data,function(error,result){

		if(result.length>0){
			res.send({status: 200});
		}else{
			res.send({status: 404});
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
			res.send({status: 200});
		}else{
			res.send({status: 500});			
		}

	});
}
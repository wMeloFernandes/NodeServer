var crypto = require('crypto');

module.exports.openIndex = function(app,req,res){
	res.render('login');
}

module.exports.makeLogin = function(app,req,res){
	var email = req.query.email;
	console.log(email);
	var password = req.query.password;
	var newPassword = crypto.createHash('md5').update(password).digest('hex');
	console.log(newPassword);

	var data = {email: email,
				password: newPassword};

	var connection = app.config.dbConnection();
	var manager = new app.app.models.ManagerDAO(connection);
	

	manager.getOneManager(data,function(error,result){
		if(result.length>0){
			res.redirect('/index.html');
			console.log("REDIRECT");
		}else{
			res.redirect('/');
			console.log("LOGIN AGAIN");
		}
	});
}

module.exports.makeLogout = function(app,req,res){
	res.render('login');
}

module.exports.openManagerPage = function(app,req,res){
		res.render('manager');
}

module.exports.insertNewManager = function(app,req,res){
	var connection = app.config.dbConnection();
	var newManager = new app.app.models.ManagerDAO(connection);
	//var manager = req.body;

	var manager = {name: req.body.name,
				password: crypto.createHash('md5').update(req.body.password).digest('hex'),
				email: req.body.email}

	newManager.insertNewManager(manager,function(error,result){
		res.render('home');
	});
}


module.exports.managerTest = function(app,req,res){
	console.log("managerTest COntroller");
	var connection = app.config.dbConnection();
	var newManager = new app.app.models.ManagerDAO(connection);
	
	var name = req.body.name;
	var password = req.body.password
	var email = req.body.email
	var newPassword = crypto.createHash('md5').update(password).digest('hex');


	var records = [name,newPassword,email];
	console.log(req.body);
	console.log(name);
	console.log(newPassword);
	console.log(email);
	console.log(records);

	var data = {name: name,
				password: newPassword,
				email: email};

	console.log(data);
	
	
	newManager.insertTest(data,function(error,result){
		res.send(result);
	});

}
module.exports.openIndex = function(app,req,res){
	res.render('login');
}

module.exports.makeLogin = function(app,req,res){
	var user = req.query.apelido;
	var password = req.query.password;

	var connection = app.config.dbConnection();
	var manager = new app.app.models.ManagerDAO(connection);

	manager.getOneManager(function(error,result){
		var option = 0;
		for(var i = 0;i<result.length;i++){
			if(result[i].name==user && result[i].password==password){
				res.redirect('/index.html');
				option = 1;
				break;
			}
		}
		if(option==0){
			res.redirect('/');
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
	var manager = req.body;

	newManager.insertNewManager(manager,function(error,result){
		res.render('home');
	});
}
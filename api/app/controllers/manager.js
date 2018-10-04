module.exports.openIndex = function(app,req,res){
	res.render('login');
}

module.exports.makeLogin = function(app,req,res){
	var user = req.query.apelido;
	var password = req.query.password;

	var connection = app.config.dbConnection();
	var manager = new app.app.models.ManagerDAO(connection);

	manager.getOneManager(function(error,result){
		for(var i = 0;i<result.length;i++){
			if(result[i].name==user && result[i].password==password){
				res.render('home');
				break;
			}else{
				console.log("No access");
				res.render('login');
			}
		}
	});
}

module.exports.makeLogout = function(app,req,res){
	res.render('login');
}

module.exports.openManagerPage = function(app,req,res){
	res.render('manager');
}
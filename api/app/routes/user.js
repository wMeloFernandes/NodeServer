module.exports = function(app){

	app.get('/users', function(req, res){
		console.log("USERS ROTE");
		app.app.controllers.user.openUsersPage(app,req,res);
	});

	app.get('/newuser',function(req,res){
		res.render('newuser');
	});

	app.post('/newUserRegister', function(req,res){
		app.app.controllers.user.newUser(app,req,res);
	})

};

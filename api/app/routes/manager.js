module.exports = function(app){

	app.get('/', function(req, res){
		app.app.controllers.manager.openIndex(app,req,res);
	})

	app.get('/home', function(req,res){
		app.app.controllers.manager.makeLogin(app,req,res);
	});

	app.get('/login',function(req,res){
		app.app.controllers.manager.makeLogout(app,req,res);
	});

	app.get('/manager', function(req, res){
		app.app.controllers.manager.openManagerPage(app,req,res);
	});


	app.get('/index.html', function(req,res){
		res.render('home');
	});

	app.post('/manager', function(req,res){
		app.app.controllers.manager.insertNewManager(app,req,res);
	});

	app.post('/managertest',function(req,res){
		console.log("managerTest ROTA");
		app.app.controllers.manager.managerTest(app,req,res);
	})


};



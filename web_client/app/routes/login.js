module.exports = function(application){

    application.get('/', function(req, res){
    	console.log('OK');
		res.render('login');
    	//application.app.controllers.index.home(application, req, res);
    });

    application.get('/login', function(req, res){
    	console.log('OK');
		res.render('login');
    	//application.app.controllers.index.home(application, req, res);
    });

}
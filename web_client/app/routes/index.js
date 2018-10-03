module.exports = function(application){

    application.get('/', function(req, res){
    	console.log('OK');
    	application.app.controllers.index.home(application, req, res);
    });


    application.get('/home', function(req, res){
    	res.render('home');
    });

}
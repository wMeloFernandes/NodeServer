module.exports = function(application){

    application.get('/gates', function(req, res){
	        application.app.controllers.gates.home(application, req, res);
    });

	application.get('/newgate', function(req, res){
	        res.render('newgate');
    });



}
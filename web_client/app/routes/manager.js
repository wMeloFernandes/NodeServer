module.exports = function(application){

    application.get('/manager', function(req, res){
	        application.app.controllers.manager.home(application, req, res);
    });

}
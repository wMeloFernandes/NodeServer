module.exports = function(application){

    application.get('/permissions', function(req, res){
	        application.app.controllers.permissions.home(application, req, res);
    });

}
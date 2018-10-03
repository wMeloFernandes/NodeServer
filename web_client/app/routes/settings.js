module.exports = function(application){

    application.get('/settings', function(req, res){
	        application.app.controllers.settings.home(application, req, res);
    });

}
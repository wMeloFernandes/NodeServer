module.exports = function(application){

    application.get('/historical', function(req, res){
	        application.app.controllers.historical.home(application, req, res);
    });

}
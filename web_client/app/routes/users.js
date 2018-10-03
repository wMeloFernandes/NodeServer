module.exports = function(application){

    application.get('/users', function(req, res){
	        application.app.controllers.users.home(application, req, res);
    });

	application.get('/edituser', function(req, res){
		res.render("edituser");
	});



}
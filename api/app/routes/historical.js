module.exports = function(app){

	app.get('/historical', function(req, res){
		app.app.controllers.historical.openHistoricalPage(app,req,res);
	});


};



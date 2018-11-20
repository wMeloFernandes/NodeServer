
module.exports.openHistoricalPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var historical = new app.app.models.HistoricalDAO(connection);

	historical.getHistoricalList(function(error,result){
		console.log("Entrou na query do histórico");
		console.log(result);
		res.render('historical', {historicalTable: result});
	});

}

module.exports.getUserHistorical = function(app,req,res){
	var connection = app.config.dbConnection();
	var historical = new app.app.models.HistoricalDAO(connection);
	var user = req.body;

	historical.getUserHistorical(user,function(error,result){

		res.send({historical: result});
	});

}

module.exports.updateHistoricalList = function(app,req,res){
	console.log("updateHistoricalList CONTROLLER");
	var connection = app.config.dbConnection();
	var historical = new app.app.models.HistoricalDAO(connection);
	var data = req.body;

	historical.updateHistoricalList(data,function(error,result){
		console.log(result);
		if(result.length>0){
			res.send({status: 200});
		}else{
			res.send({status: 500});
		}	});

}

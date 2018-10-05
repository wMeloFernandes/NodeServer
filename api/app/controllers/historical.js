
module.exports.openHistoricalPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var historical = new app.app.models.HistoricalDAO(connection);

	historical.getHistoricalList(function(error,result){
		console.log("Entrou na query do histórico");
		console.log(result);
		res.render('historical', {historicalTable: result});
	});

}

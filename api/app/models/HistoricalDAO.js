function HistoricalDAO(connection){
	this._connection = connection;
}


HistoricalDAO.prototype.getHistoricalList = function(callback){
	this._connection.query('SELECT user, gate_id, time FROM historical',callback);
}

module.exports = function(){

    return HistoricalDAO;

}
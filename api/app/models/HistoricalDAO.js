function HistoricalDAO(connection){
	this._connection = connection;
}


HistoricalDAO.prototype.getHistoricalList = function(callback){
	this._connection.query('SELECT user_id, gate_id, time FROM historical',callback);
}

HistoricalDAO.prototype.getUserHistorical = function(user,callback){
	this._connection.query('SELECT * FROM historical WHERE user_id=? ORDER BY time DESC',user.user_id,callback)
}

HistoricalDAO.prototype.updateHistoricalList = function(data,callback){
	this._connection.query('INSERT INTO historical SET ?',data,callback);
}

module.exports = function(){

    return HistoricalDAO;

}
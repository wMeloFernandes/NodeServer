function GateDAO(connection){
	this._connection = connection;
}


GateDAO.prototype.getGatesList = function(callback){
	this._connection.query('SELECT * FROM gate',callback);
}

GateDAO.prototype.insertNewGate = function(gate,callback){
	this._connection.query('INSERT INTO gate SET ?',gate,callback);
}

module.exports = function(){

    return GateDAO;

}
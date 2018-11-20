function GateDAO(connection){
	this._connection = connection;
}


GateDAO.prototype.getGatesList = function(callback){
	this._connection.query('SELECT * FROM gate ORDER BY name',callback);
}

GateDAO.prototype.insertNewGate = function(gate,callback){
	console.log("insertNewGateDAO");
	this._connection.query('INSERT INTO gate SET ?', gate, callback);
}

GateDAO.prototype.deleteGate = function(gate,callback){
	this._connection.query('DELETE FROM gate WHERE gate_id=?',gate.gate_id,callback);
}

GateDAO.prototype.updateGateLastAccess = function(gate,callback){
	var query = "UPDATE gate SET last_access = current_timestamp WHERE gate_id="+gate.gate_id;
	this._connection.query(query,callback);
}

module.exports = function(){

    return GateDAO;

}

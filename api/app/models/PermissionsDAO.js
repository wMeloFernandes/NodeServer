function PermissionsDAO(connection){
	this._connection = connection;
}


PermissionsDAO.prototype.getApprovedList = function(callback){
	this._connection.query('SELECT * FROM permission WHERE status=1 ORDER BY time ',callback);
}

PermissionsDAO.prototype.getOnHoldPermissions = function(permission,callback){
	console.log("ENTROU NO DAO");
	this._connection.query('SELECT * FROM permission WHERE user_id=? AND status = 1',permission.user_id,callback);
}

PermissionsDAO.prototype.insertNewRequest = function(data,callback){
	this._connection.query('INSERT INTO permission SET ?',data,callback);
}

PermissionsDAO.prototype.approveRequest = function(data,callback){
	this._connection.query('UPDATE permission SET status=2 where requisition_id=?',data.requisition_id,callback);
}

PermissionsDAO.prototype.rejectRequest = function(data, callback){
	console.log("ENTROU NO DAO");
	this._connection.query('DELETE FROM permission where requisition_id=?',data.requisition_id,callback);
}

PermissionsDAO.prototype.getUserID = function(data,callback){
	this._connection.query('SELECT user_id FROM permission where requisition_id=?',data.requisition_id,callback);
}

PermissionsDAO.prototype.getGateID = function(data,callback){
	this._connection.query('SELECT gate_id FROM permission where requisition_id=?',data.requisition_id,callback);
}

PermissionsDAO.prototype.getApprovedNumber = function(callback){
	this._connection.query('SELECT * FROM permission WHERE status=2',callback);
}

PermissionsDAO.prototype.getOnHoldNumber = function(data,callback){
	this._connection.query('SELECT * FROM permission WHERE status=1',callback);
}


module.exports = function(){

    return PermissionsDAO;

}
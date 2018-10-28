function PermissionsDAO(connection){
	this._connection = connection;
}


PermissionsDAO.prototype.getApprovedList = function(callback){
	this._connection.query('SELECT user,gate_id,time,status FROM permission',callback);
}

PermissionsDAO.prototype.getOnHoldPermissions = function(permission,callback){
	console.log("ENTROU NO DAO");
	this._connection.query('SELECT * FROM permission WHERE user_id=? AND status = 1',permission.user_id,callback);
}

module.exports = function(){

    return PermissionsDAO;

}
function PermissionsDAO(connection){
	this._connection = connection;
}


PermissionsDAO.prototype.getApprovedList = function(callback){
	this._connection.query('SELECT user,gate_id,time,status FROM permission',callback);
}

module.exports = function(){

    return PermissionsDAO;

}
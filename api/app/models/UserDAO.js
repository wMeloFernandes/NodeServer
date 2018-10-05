function UserDAO(connection){
	this._connection = connection;
}


UserDAO.prototype.getUsersList = function(callback){
	this._connection.query('SELECT username,email,last_access FROM user',callback);
}

module.exports = function(){

    return UserDAO;

}
function UserDAO(connection){
	this._connection = connection;
}


UserDAO.prototype.getUsersList = function(callback){
	this._connection.query('SELECT username,email,last_access FROM user',callback);
}

UserDAO.prototype.insertNewUser = function(user, callback){
	console.log("insertNewUser DAO");
	this._connection.query('INSERT INTO user SET ?', user, callback);
}

UserDAO.prototype.getUserAccess = function(user,callback){
	this._connection.query('SELECT password FROM user where username = ?',user.username,callback);
}

module.exports = function(){

    return UserDAO;

}


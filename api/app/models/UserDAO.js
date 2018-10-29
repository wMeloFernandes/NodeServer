function UserDAO(connection){
	this._connection = connection;
}


UserDAO.prototype.getUsersList = function(callback){
	this._connection.query('SELECT username,email,last_access FROM user',callback);
}

UserDAO.prototype.insertNewUser = function(user, callback){
	console.log("Entrou no DAO");
	this._connection.query('INSERT INTO user SET ?', user, callback);
}

UserDAO.prototype.getUserAccess = function(data,callback){
	var query = "SELECT * FROM user WHERE email = '"+data.email+"' AND password = '"+data.password+"'";
	console.log(query);
	this._connection.query(query,callback);
}

UserDAO.prototype.getOneUser = function(user,callback){
	this._connection.query('SELECT * FROM user where username = ?',user.username,callback);
}

UserDAO.prototype.getUserByRecover = function(user,callback){
	var query = "SELECT * FROM user WHERE user_id = '"+user.user_id+"' AND email = '"+user.email+"'";
	this._connection.query(query,callback);
}

UserDAO.prototype.updateUserPassword = function(user,callback){
	var query = "UPDATE user SET password = '"+user.password+"' WHERE user_id = '"+user.user_id+"'";
	console.log(query);
	this._connection.query(query,callback);
}

UserDAO.prototype.checkIfEmailIsAlreadyRegistered = function(user,callback){
	this._connection.query('SELECT * FROM user WHERE email=?',user.email,callback);
}

UserDAO.prototype.getAllUserInformations = function(user,callback){
	this._connection.query('SELECT * FROM user WHERE email=?',user.email,callback);
}

UserDAO.prototype.getUserRecover = function(user,callback){
	this._connection.query('SELECT * FROM user WHERE user_id=?',user.user_id,callback);
}

UserDAO.prototype.getUserPermissions = function(user,callback){
	this._connection.query('SELECT permissions FROM user WHERE user_id=?',user.user_id,callback);
}

UserDAO.prototype.updateUserPermission = function(data,callback){
	var query = "UPDATE user SET permissions="+'"'+ data.permissions+ '"'+" WHERE user_id="+data.user_id;
	this._connection.query(query,callback);
}
module.exports = function(){

    return UserDAO;

}
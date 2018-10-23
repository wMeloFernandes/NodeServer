function ManagerDAO(connection){
	this._connection = connection;
}


ManagerDAO.prototype.getOneManager = function(callback){
	this._connection.query('SELECT name, password FROM manager',callback);
}

ManagerDAO.prototype.insertNewManager = function(manager,callback){
	this._connection.query('INSERT INTO manager SET ?', manager, callback);
}

ManagerDAO.prototype.insertTest = function(data,callback){
	console.log("test DAO");
	this._connection.query('INSERT INTO manager SET ?',data,callback);
}

module.exports = function(){

    return ManagerDAO;

}
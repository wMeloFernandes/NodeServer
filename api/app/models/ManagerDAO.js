function ManagerDAO(connection){
	this._connection = connection;
}


ManagerDAO.prototype.getOneManager = function(callback){
	this._connection.query('SELECT name, password FROM manager',callback);
}

module.exports = function(){

    return ManagerDAO;

}
function ManagerDAO(connection){
	this._connection = connection;
}


ManagerDAO.prototype.checkManager = function(name,password,callback) {
	console.log("Entrou na query");
	this._connection.query('SELECT * FROM manager where name=' + name, callback);
}


module.exports = function(){

    return ManagerDAO;

}
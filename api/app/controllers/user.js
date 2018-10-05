module.exports.openUsersPage = function(app,req,res){
	var connection = app.config.dbConnection();
	var users = new app.app.models.UserDAO(connection);

	users.getUsersList(function(error,result){
		console.log(result);
		res.render('users', {users: result});
	})
}

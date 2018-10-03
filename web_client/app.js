//importar as configurações do servidor

var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(80, function(){
	console.log('Server ON');
});

var io = require('socket.io').listen(server);
app.set('io',io);

//Criar a conexão por websocket
io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});
});
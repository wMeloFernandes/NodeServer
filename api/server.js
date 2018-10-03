var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');

var mysql = require('mysql');

var connMySQL = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'digitalkeydb',
    });


var app = express();

// body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = 8080;

app.listen(port);

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost',27017,{}),
    {}
);

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function(req, res){
    res.send({msg:'Olá'});
});

app.post('/loginManager', function(req,res){
	var dados = req.body;
	var connection = connMySQL;
	//var manager = new app.models.ManagerDAO(connection);
	console.log(connection);
	res.send(dados);
})

app.post('/api', function(req, res){
    var dados = req.body;
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.insert(dados, function(err, records){
                if(err){
                    res.json({'status': 'erro'});
                }else{
                    res.json({'status': 'inclusao realizada com sucesso'});
                }
                mongoclient.close();
            });
        });
    });
});
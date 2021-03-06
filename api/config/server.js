var express = require('express'); //Importando a lib
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var app = express();//Iniciando express

app.set('view engine','ejs');
app.set('views','../web_client/app/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator());
app.use(expressSession({
	secret: ';N^&[Ab?u_vB{pjf32@B:[[S)#%$ZB',
	resave: false,
	saveUninitialized: false
}));
app.use(express.static('../web_client/app/public'));




consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);


module.exports = app;

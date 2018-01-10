'use strict';

var express 	= require('express');
var app			= express();
var bodyParser 	= require('body-parser');
var APIs 		= require('./controllers/apis_r')
var helmet 		= require('helmet')

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.disable('x-powered-by') 

app.use('/api', APIs)

// Status 404 (Error) 
app.use('*', function(req, res){
  res.status(404).send('Invalid url')
});


app.use(express.static('routes'));


// app.listen(8080);
var port = process.argv[2]
port =  ( port == "8080") ? port : 8081; //8080 for production, 8081 for testing
app.listen(port); 


console.log("Running at port " + port);

module.exports = app;
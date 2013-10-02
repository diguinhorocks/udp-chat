var app = exports.app = require('express')()
  , express = require('express')
  , index = require('./routes/index');


//definindo o template engine
app.engine('html', require('ejs').renderFile);
//escolhendo o template previamente definido
app.set('view engine', 'html'); 
//setando o path das views
app.set('views', __dirname + '/views');
//setando o path dos assets
app.use(express.static(__dirname + '/public'));
//definição das routes
app.use(app.router);

/*
* app routes
*/

app.get('/', index.main);

/*
* server
*/ 
require('./server');


// incluindo socket io para manipular eventos assincronos com o server
require('./sockets')

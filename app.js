 var  express = require('express')
	, namespace = require('express-namespace')
	, routes = require('./routes')
	, passport = require('passport')
	, config = require('./config.json')
	, store = new express.session.MemoryStore;


var app = exports.app = express();
/*
* Auth Strategy
*/
require('./lib/strategy');


//definindo o template engine
app.engine('html', require('ejs').renderFile);
//escolhendo o template previamente definido
app.set('view engine', 'html'); 
//setando o path das views
app.set('views', __dirname + '/views');
//setando o path dos assets
app.use(express.static(__dirname + '/public'));
//cookies and session
app.use(express.cookieParser(config.session.secret));
app.use(express.bodyParser());
app.use(express.session({
	secret: config.session.secret,
	store: store
}));
//auth
app.use(passport.initialize());
app.use(passport.session());
//routing
app.use(app.router);

/*
* app routes
*/
routes.configure(app);

/*
* server
*/ 
require('./lib/server');
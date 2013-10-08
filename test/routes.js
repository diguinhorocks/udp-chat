var vows = require('vows')
	, assert = require('assert')
	, api = require('api-easy')
	, app = require('../app');

var suite = api.describe('app routing');

suite.discuss('When using the Application')
     .discuss('the Ping resource')

suite.use('localhost', 8080).setHeader('Content-Type', 'text/html');

//
// and to always send 'Content-Type': 'text/html'
//
suite
    .get('/')
    	.expect(200)
    .get('/auth/twitter')
    	.expect(200)
    .get('/auth/facebook')
    	.expect(200)
    .get('/login')
    	.expect(200)
	.export(module)
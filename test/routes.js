var vows = require('vows')
	, assert = require('assert')
	, api = require('api-easy')
	, app = require('../app');

var suite = api.describe('app routing');

//
// Add some discussion around the vowsjs tests.
// Not familiar with vows? Checkout:
// http://vowsjs.org 
//
suite.discuss('When using the API')
     .discuss('the Ping resource')

suite.use('localhost', 8080).setHeader('Content-Type', 'text/html');

//
// and to always send 'Content-Type': 'text/html'
//
suite
     .get('/')
       .expect(200)
       	.export(module)